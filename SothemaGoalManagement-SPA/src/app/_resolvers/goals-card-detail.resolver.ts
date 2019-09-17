import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { GoalCard } from '../_models/GoalCard';
import { UserService } from './../_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class GoalsCardDetailResolver implements Resolve<GoalCard> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<GoalCard> {
    return this.userService.getGoalCard(route.params['id'], this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error('Problème lors de la récupération des données de votre fiche des objectifs');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
