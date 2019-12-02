import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEnvelope, faEnvelopeOpen, faPaperPlane, faList } from '@fortawesome/free-solid-svg-icons';

import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  public loading = false;
  faList = faList;
  faEnvelope = faEnvelope;
  faEnvelopeOpen = faEnvelopeOpen;
  faPaperPlane = faPaperPlane;
  showMessageThread: boolean;
  recipientId: number;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.loading = true;
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.loading = false;
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Supprimer',
      'Êtes-vous sûr de vouloir supprimer ce message',
      () => {
        this.loading = true;
        this.userService
          .deleteMessage(id, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.loading = false;
              this.messages.splice(
                this.messages.findIndex(m => m.id === id),
                1
              );
              this.alertify.success('Le message a été supprimé');
            },
            error => {
              this.loading = false;
              this.alertify.error('Impossible de supprimer le message');
            }
          );
      }
    );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  fetchMessageThread(recipientId) {
    this.recipientId = recipientId;
    this.showMessageThread = true;
  }

  returnMessages() {
    this.showMessageThread = false;
  }
}
