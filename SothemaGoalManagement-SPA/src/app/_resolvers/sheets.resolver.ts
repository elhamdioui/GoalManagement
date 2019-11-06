import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from './../_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { EvaluationFileInstance } from './../_models/evaluationFileInstance';

@Injectable()
export class SheetsResolver implements Resolve<any> {
  pageNumber = 1;
  pageSize = 10;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return forkJoin(
      [
        this.userService.getMyCollaboratorsSheets(this.authService.decodedToken.nameid).pipe(
          catchError(error => {
            this.alertify.error('Problème lors de la récupération des données de votre fiches d\'évaluation');
            this.router.navigate(['/']);
            return of(null);
          })),

        this.userService.getMySheets(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize).pipe(
          catchError(error => {
            this.alertify.error('Problème lors de la récupération des données de votre fiches d\'évaluation');
            this.router.navigate(['/']);
            return of(null);
          }))
      ]).pipe(map(result => {
        return {
          sheetsToValidate: result[0],
          sheets: result[1]
        };
      }));
  }
}
