import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Strategy } from '../_models/strategy';
import { HrService } from './../_services/hr.service';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class StrategyDetailResolver implements Resolve<Strategy> {
  constructor(
    private hrService: HrService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Strategy> {
    return this.hrService.getStrategy(route.params['id'], this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error('Problème lors de la récupération des données de votre stratégie');
        this.router.navigate(['/hr']);
        return of(null);
      })
    );
  }
}
