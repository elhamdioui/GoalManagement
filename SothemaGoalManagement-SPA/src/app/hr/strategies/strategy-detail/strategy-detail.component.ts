import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Strategy } from '../../../_models/strategy';
import { Axis } from './../../../_models/axis';
import { HrService } from '../../../_services/hr.service';
import { AlertifyService } from '../../../_services/alertify.service';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-strategy-detail',
  templateUrl: './strategy-detail.component.html',
  styleUrls: ['./strategy-detail.component.css']
})
export class StrategyDetailComponent implements OnInit {
  strategy: Strategy;
  axisList: Axis[];
  loading: boolean = false;
  isReadOnly: boolean;
  faTrash = faTrash;

  constructor(private hrService: HrService, private authService: AuthService, private alertify: AlertifyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.strategy = data['strategy'];
      this.isReadOnly = this.strategy.sealed;
    });

    this.loadAxisList(this.strategy.id);
  }

  loadAxisList(strategyId) {
    this.loading = true;
    this.hrService.getAxisList(strategyId).subscribe(
      axises => {
        this.loading = false;
        this.axisList = axises;
      },
      error => {
        this.loading = false;
        this.alertify.error(error);
      }
    );
  }

  handleAddAxis(strategyId: number, newAxis: Axis) {
    newAxis.strategyId = strategyId;
    this.loading = true;
    this.hrService
      .addAxis(newAxis)
      .subscribe(
        (axis: Axis) => {
          this.loading = false;
          this.axisList.unshift(axis);
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }

  clone() {
    this.loading = true;
    this.hrService
      .cloneStrategy(this.authService.decodedToken.nameid, this.strategy.id)
      .subscribe(
        () => {
          this.loading = false;
          this.alertify.success('La stratégie a été clonée avec succès');
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        },
        () => {
          this.router.navigate(['/hr']);
        }
      );
  }

  delete() {
    this.alertify.confirm(
      'Etes-vous sur de vouloir supprimer cette stratégie?',
      () => {
        this.loading = true;
        this.hrService.deleteStrategy(this.strategy.id)
          .subscribe(
            () => {
              this.loading = false;
              this.alertify.success('La stratégie a été supprimée');
            },
            error => {
              this.loading = false;
              this.alertify.error('Impossible de supprimer la stratégie: ' + error);
            },
            () => {
              this.router.navigate(['/hr']);
            }
          );
      }
    );
  }
}
