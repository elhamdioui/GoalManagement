import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from './../_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { GoalCard } from './../_models/GoalCard';


@Injectable()
export class GoalsCardsResolver implements Resolve<GoalCard[]> {
  pageNumber = 1;
  pageSize = 10;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<GoalCard[]> {
    return this.userService
      .getGoalsCards(
        this.authService.decodedToken.nameid,
        this.pageNumber,
        this.pageSize
      )
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving goal cards');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
