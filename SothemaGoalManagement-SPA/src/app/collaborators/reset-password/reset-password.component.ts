import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  model: any = {};
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService,
    private alertify: AlertifyService, ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.model.token = params['token'];
      this.model.email = params['email']
      console.log('Token: ', this.model.token);
    });
  }

  resetPassword() {
    this.authService.resetPassword(this.model).subscribe(
      next => {
        this.alertify.success('Réinitialisation avec succès');
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
