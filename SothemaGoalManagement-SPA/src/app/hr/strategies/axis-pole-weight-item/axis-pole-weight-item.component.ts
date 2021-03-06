import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';

import { AxisPole } from './../../../_models/axisPole';


@Component({
  selector: 'app-axis-pole-weight-item',
  templateUrl: './axis-pole-weight-item.component.html',
  styleUrls: ['./axis-pole-weight-item.component.css']
})
export class AxisPoleWeightItemComponent implements OnInit {
  @Input() axisPole: AxisPole;
  @Input() isReadOnly: boolean;
  @Output() updateAxisPoleEvent = new EventEmitter<AxisPole>();
  editing: boolean = false;
  faEdit = faEdit;
  faSave = faSave;
  faUndo = faUndo;

  constructor() { }

  ngOnInit() {
  }

  onWeightChange(value: number) {
    this.axisPole.weight = value;
  }

  toggleEdit() {
    if (this.editing) {
      this.updateAxisPoleEvent.emit(this.axisPole);
    }
    this.editing = !this.editing;
  }

  cancel() {
    this.editing = !this.editing;
  }
}
