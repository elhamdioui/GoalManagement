import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { BehavioralSkill } from '../_models/behavioralSkill';
import { HrService } from './../_services/hr.service';
import { AlertifyService } from './../_services/alertify.service';

@Injectable()
export class BehavioralSkillDetailResolver implements Resolve<BehavioralSkill> {
  constructor(
    private hrService: HrService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<BehavioralSkill> {
    return this.hrService.getBehavioralSkill(route.params['id']).pipe(
      catchError(error => {
        this.alertify.error('Problème lors de la récupération des données de votre compétence comportementale');
        this.router.navigate(['/hr']);
        return of(null);
      })
    );
  }
}
