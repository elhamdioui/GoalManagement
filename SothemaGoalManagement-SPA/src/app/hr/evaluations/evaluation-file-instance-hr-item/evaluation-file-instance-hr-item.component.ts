import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AxisInstance } from '../../../_models/axisInstance';

@Component({
  selector: 'app-evaluation-file-instance-hr-item',
  templateUrl: './evaluation-file-instance-hr-item.component.html',
  styleUrls: ['./evaluation-file-instance-hr-item.component.css']
})
export class EvaluationFileInstanceHrItemComponent implements OnInit {
  @Input() axisInstance: AxisInstance;
  @Output() updateUserWeightEvent = new EventEmitter<AxisInstance>();
  editing: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onWeightChange(value: number) {
    this.axisInstance.userWeight = value;
  }

  toggleEdit() {
    if (this.editing) {
      this.updateUserWeightEvent.emit(this.axisInstance);
    }
    this.editing = !this.editing;
  }

}
