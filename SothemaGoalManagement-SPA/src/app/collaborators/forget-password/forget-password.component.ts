import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  model: any = {};
  constructor(private router: Router, private authService: AuthService, private alertify: AlertifyService, ) { }

  ngOnInit() {
  }

  requestResetPassword() {
    this.authService.requestResetPassword(this.model).subscribe(
      next => {
        this.alertify.success('Demande est faite avec succèes');
      },
      error => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/home']);
      }
    );
  }

}