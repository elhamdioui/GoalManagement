import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { User } from '../_models/user';
import { AdminService } from './../_services/admin.service';
import { AlertifyService } from './../_services/alertify.service';

@Injectable()
export class CollaboratorDetailResolver implements Resolve<User> {
  constructor(
    private adminService: AdminService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.adminService.getUser(route.params['id']).pipe(
      catchError(error => {
        this.alertify.error('Problème lors de la récupération des données de votre utilisateur');
        this.router.navigate(['/admin']);
        return of(null);
      })
    );
  }
}
