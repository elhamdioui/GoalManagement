import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

import { AxisPole } from './../../../_models/axisPole';


@Component({
  selector: 'app-axis-pole-weight-item',
  templateUrl: './axis-pole-weight-item.component.html',
  styleUrls: ['./axis-pole-weight-item.component.css']
})
export class AxisPoleWeightItemComponent implements OnInit {
  @Input() axisPole: AxisPole;
  @Input() isReadOnly: boolean;
  @Output() updateWeightEvent = new EventEmitter<AxisPole>();
  editing: boolean = false;
  faEdit = faEdit;
  faSave = faSave;

  constructor() { }

  ngOnInit() {
  }

  onWeightChange(value: number) {
    this.axisPole.weight = value;
  }

  toggleEdit() {
    if (this.editing) {
      this.updateWeightEvent.emit(this.axisPole);
    }
    this.editing = !this.editing;
  }
}
