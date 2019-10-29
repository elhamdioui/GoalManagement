import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { EvaluationFileInstance } from '../_models/evaluationFileInstance';
import { UserService } from './../_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class SheetDetailResolver implements Resolve<EvaluationFileInstance> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<EvaluationFileInstance> {
    return this.userService.getMySheet(route.params['id'], this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error('Problème lors de la récupération des données de votre stratégie');
        this.router.navigate(['/hr']);
        return of(null);
      })
    );
  }
}
