import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from './../_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { EvaluationFileInstance } from './../_models/evaluationFileInstance';

@Injectable()
export class SheetsResolver implements Resolve<EvaluationFileInstance> {
  pageNumber = 1;
  pageSize = 10;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<EvaluationFileInstance> {
    return this.userService
      .getMySheets(
        this.authService.decodedToken.nameid,
        this.pageNumber,
        this.pageSize).pipe(
          catchError(error => {
            this.alertify.error('Problème lors de la récupération des données de votre fiches d\'évaluation');
            this.router.navigate(['/hr']);
            return of(null);
          }));
  }
}
