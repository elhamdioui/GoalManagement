import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

import { Strategy } from '../../../_models/strategy';
import { Axis } from './../../../_models/axis';
import { HrService } from '../../../_services/hr.service';
import { AlertifyService } from '../../../_services/alertify.service';

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

  constructor(private hrService: HrService, private alertify: AlertifyService, private route: ActivatedRoute
  ) { }

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
}
