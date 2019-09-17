import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from './../_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { Strategy } from '../_models/strategy';

@Injectable()
export class StrategiesResolver implements Resolve<Strategy[]> {

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Strategy[]> {
    return this.userService
      .getPublishedStrategies()
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving Strategies');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
