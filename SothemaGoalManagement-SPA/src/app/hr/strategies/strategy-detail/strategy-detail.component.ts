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
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-strategy-detail',
  templateUrl: './strategy-detail.component.html',
  styleUrls: ['./strategy-detail.component.css']
})
export class StrategyDetailComponent implements OnInit {
  strategy: Strategy;
  axisList: Axis[];

  constructor(private hrService: HrService, private authService: AuthService, private alertify: AlertifyService, private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.strategy = data['strategy'];
    });

    this.loadAxisList(this.strategy.id);
  }

  loadAxisList(strategyId) {
    this.hrService.getAxisList(strategyId).subscribe(
      axises => {
        this.axisList = axises;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
