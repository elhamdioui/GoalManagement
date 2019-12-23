import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { HrService } from './../_services/hr.service';
import { AlertifyService } from './../_services/alertify.service';
import { EvaluationFile } from './../_models/evaluationFile';

@Injectable()
export class EvaluationHrDetailResolver implements Resolve<EvaluationFile> {
  constructor(
    private hrService: HrService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<EvaluationFile> {
    return this.hrService.getEvaluationFile(route.params['id']).pipe(
      catchError(error => {
        this.alertify.error(`Problème lors de la récupération des données de votre fiche d\'évaluation: ${error}`);
        this.router.navigate(['/hr']);
        return of(null);
      }));
  }
}
