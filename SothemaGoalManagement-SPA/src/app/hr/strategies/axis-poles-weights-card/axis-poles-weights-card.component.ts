import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { AxisPole } from './../../../_models/axisPole';
import { Axis } from '../../../_models/axis';


@Component({
  selector: 'app-axis-poles-weights-card',
  templateUrl: './axis-poles-weights-card.component.html',
  styleUrls: ['./axis-poles-weights-card.component.css']
})
export class AxisPolesWeightsCardComponent implements OnInit {
  @Input() axis: Axis;
  @Input() isReadOnly: boolean;
  @Output() updateAxisPoleEvent = new EventEmitter<AxisPole>();
  axisPoleList: AxisPole[];
  isCollapsed: boolean = false;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  constructor() { }

  ngOnInit() {
    this.axisPoleList = this.axis.axisPoles;
  }

  handleUpdateAxisPole(axisPole: AxisPole) {
    this.updateAxisPoleEvent.emit(axisPole);
  }
}
