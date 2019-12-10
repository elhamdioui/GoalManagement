import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Goal } from '../_models/goal';
import { UserService } from './../_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class GoalDetailResolver implements Resolve<Goal> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Goal> {
    return this.userService.getGoalDetail(this.authService.decodedToken.nameid, route.params['id']).pipe(
      catchError(error => {
        this.alertify.error('Problème lors de la récupération des données de votre objectif');
        this.router.navigate(['/sheets']);
        return of(null);
      })
    );
  }
}
