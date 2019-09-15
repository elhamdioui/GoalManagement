import { Component, OnInit, Input } from '@angular/core';

import { Axis } from './../../../_models/axis';
import { HrService } from '../../../_services/hr.service';
import { AlertifyService } from '../../../_services/alertify.service';

@Component({
  selector: 'app-axis-poles-weights-list',
  templateUrl: './axis-poles-weights-list.component.html',
  styleUrls: ['./axis-poles-weights-list.component.css']
})
export class AxisPolesWeightsListComponent implements OnInit {
  @Input() axisList: Axis[];

  constructor() { }

  ngOnInit() {
  }

}
