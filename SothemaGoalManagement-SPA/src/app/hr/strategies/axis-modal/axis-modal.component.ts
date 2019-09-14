import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Axis } from '../../../_models/axis';

@Component({
  selector: 'app-axis-modal',
  templateUrl: './axis-modal.component.html',
  styleUrls: ['./axis-modal.component.css']
})
export class AxisModalComponent implements OnInit {
  @Output() updateSelectedAxis = new EventEmitter();

  axis: Axis;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  updateAxis() {
    this.updateSelectedAxis.emit(this.axis);
    this.bsModalRef.hide();
  }

}
