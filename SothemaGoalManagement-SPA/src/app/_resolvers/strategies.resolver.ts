import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { HrService } from './../_services/hr.service';
import { AlertifyService } from './../_services/alertify.service';
import { Strategy } from '../_models/strategy';

@Injectable()
export class StrategiesResolver implements Resolve<Strategy[]> {

  constructor(
    private hrService: HrService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Strategy[]> {
    return this.hrService
      .getPublishedStrategies()
      .pipe(
        catchError(error => {
          this.alertify.error(`Problem retrieving Strategies: ${error}`);
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
