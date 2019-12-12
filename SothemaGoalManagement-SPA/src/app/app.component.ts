import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';
import { User } from './_models/user';
import { LayoutService } from './_services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  isSpinnerVisibile$: Observable<boolean> = this.layoutService.isNavigationPending$;
  model: any = {};
  public loading = false;
  faUser = faUser;
  faKey = faKey;

  constructor(private authService: AuthService, private layoutService: LayoutService,
    private alertify: AlertifyService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  login() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      console.log('done')
    }, 2000);
    console.log('testing');
    // this.authService.login(this.model).subscribe(
    //   next => {
    //     this.loading = false;
    //     this.userService.totalUnreadMessages(this.authService.decodedToken.nameid);
    //     this.alertify.success('Connecté avec succès');
    //   },
    //   error => {
    //     this.loading = false;
    //     this.alertify.error(error);
    //   },
    //   () => {
    //     this.router.navigate(['']);
    //   }
    // );
  }
}

