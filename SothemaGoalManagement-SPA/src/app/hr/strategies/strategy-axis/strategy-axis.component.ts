import { Component, Input, OnInit } from '@angular/core';

import { Axis } from './../../../_models/axis';
import { HrService } from '../../../_services/hr.service';
import { AlertifyService } from '../../../_services/alertify.service';

@Component({
  selector: 'app-strategy-axis',
  templateUrl: './strategy-axis.component.html',
  styleUrls: ['./strategy-axis.component.css']
})
export class StrategyAxisComponent implements OnInit {
  @Input() strategyId: number;
  axisList: Axis[];
  newAxis: any = {};
  constructor(private hrService: HrService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadAxisList();
  }

  loadAxisList() {
    this.hrService.getAxisList(this.strategyId).subscribe(
      axises => {
        this.axisList = axises;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  addAxis() {
    this.newAxis.strategyId = this.strategyId;
    this.hrService
      .addAxis(this.newAxis)
      .subscribe(
        (axis: Axis) => {
          this.axisList.unshift(axis);
          this.newAxis.description = ';';
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

}
