import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { EvaluationFileInstance } from '../_models/evaluationFileInstance';
import { HrService } from './../_services/hr.service';
import { AlertifyService } from './../_services/alertify.service';
import { EvaluationFile } from './../_models/evaluationFile';

@Injectable()
export class EvaluationHrDetailResolver implements Resolve<any> {
  constructor(
    private hrService: HrService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return forkJoin(
      [
        this.hrService.getEvaluationFile(route.params['id']).pipe(
          catchError(error => {
            this.alertify.error('Problème lors de la récupération des données de votre fiche d\'évaluation');
            this.router.navigate(['/hr']);
            return of(null);
          })),

        this.hrService.getEvaluationFileInstancesByEvaluationFileId(route.params['id']).pipe(
          catchError(error => {
            this.alertify.error('Problème lors de la récupération des données de votre fiche d\'évaluation');
            this.router.navigate(['/hr']);
            return of(null);
          }))
      ]).pipe(map(result => {
        return {
          evaluationFile: result[0],
          evaluationFileInstanceList: result[1]
        };
      }));
  }
}
