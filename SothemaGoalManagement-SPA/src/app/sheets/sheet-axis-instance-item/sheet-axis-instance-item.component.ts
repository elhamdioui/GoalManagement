import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faSave, faEdit, faUndo } from '@fortawesome/free-solid-svg-icons';

import { AxisInstance } from '../../_models/axisInstance';

@Component({
  selector: 'app-sheet-axis-instance-item',
  templateUrl: './sheet-axis-instance-item.component.html',
  styleUrls: ['./sheet-axis-instance-item.component.css']
})
export class SheetAxisInstanceItemComponent implements OnInit {
  @Input() axisInstance: AxisInstance;
  @Input() goalsStatus: string;
  @Output() updateUserWeightEvent = new EventEmitter<any>();
  faSave = faSave;
  faEdit = faEdit;
  faUndo = faUndo;
  editing: boolean = false;
  oldUserWeight: number;

  constructor() { }

  ngOnInit() {
    this.oldUserWeight = this.axisInstance.userWeight;
  }

  toggleEdit(axisInstance: AxisInstance) {
    if (this.editing) {
      const data = { oldUserWeight: this.oldUserWeight, axisInstance: this.axisInstance };
      this.updateUserWeightEvent.emit(data);
    }
    this.editing = !this.editing;
  }

  cancel() {
    this.editing = !this.editing;
  }
}
