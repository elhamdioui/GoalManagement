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
  @Output() updateUserWeightEvent = new EventEmitter<AxisInstance>();
  faSave = faSave;
  faEdit = faEdit;
  faUndo = faUndo;
  editing: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleEdit(axisInstance: AxisInstance) {
    if (this.editing) {
      this.updateUserWeightEvent.emit(axisInstance);
    }
    this.editing = !this.editing;
  }

  cancel() {
    this.editing = !this.editing;
  }
}
