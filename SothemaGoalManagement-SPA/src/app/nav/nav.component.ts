import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  photoUrl: string;
  faSignOutAlt = faSignOutAlt;
  faKey = faKey;
  faUser = faUser;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(
      photoUrl => (this.photoUrl = photoUrl)
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Déconnecté');
    this.router.navigate(['/home']);
  }
}
