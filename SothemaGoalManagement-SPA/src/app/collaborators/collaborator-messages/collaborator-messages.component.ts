import { Component, OnInit, Input } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Message } from './../../_models/message';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-collaborator-messages',
  templateUrl: './collaborator-messages.component.html',
  styleUrls: ['./collaborator-messages.component.css']
})
export class CollaboratorMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};
  public loading = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap(messages => {
          for (let i = 0; i < messages.length; i++) {
            if (
              messages[i].isRead === false &&
              messages[i].recipientId === currentUserId
            ) {
              this.userService.markAsRead(currentUserId, messages[i].id);
            }
          }
        })
      )
      .subscribe(
        messages => {
          this.messages = messages;
          this.loading = false;
        },
        error => {
          this.alertify.error(error);
          this.loading = false;
        },
        () => this.userService.totalUnreadMessages(this.authService.decodedToken.nameid)
      );
  }

  sendMessage() {
    this.loading = true;
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message: Message) => {
          this.messages.unshift(message);
          this.newMessage.content = '';
          this.loading = false;
        },
        error => {
          this.alertify.error(error);
          this.loading = false;
        }
      );
  }
}
