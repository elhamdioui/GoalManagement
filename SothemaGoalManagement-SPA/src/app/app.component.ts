import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { User } from './_models/user';
import { LayoutService } from './_services/layout.service';
import { Message } from './_models/message';
import { PaginatedResult } from './_models/pagination';
import { AlertifyService } from './_services/alertify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  isSpinnerVisibile$: Observable<boolean> = this.layoutService.isNavigationPending$;
  showBell: boolean;
  public loading = false;

  constructor(private authService: AuthService, private layoutService: LayoutService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
      this.checkNonReadMessages();
    }
  }

  checkNonReadMessages() {
    console.log('here we go');
    this.loading = true;
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        1,
        10,
        'Unread'
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.loading = false;
          console.log('messages:', res.result);
          if (res.result.length > 0) this.showBell = true;
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }
}

