import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from './../_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Goal } from '../_models/goal';

@Injectable()
export class GoalsResolver implements Resolve<Goal[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Goal[]> {
    return this.userService
      .getGoals(
        this.authService.decodedToken.nameid,
        this.pageNumber,
        this.pageSize
      )
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving goals');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
