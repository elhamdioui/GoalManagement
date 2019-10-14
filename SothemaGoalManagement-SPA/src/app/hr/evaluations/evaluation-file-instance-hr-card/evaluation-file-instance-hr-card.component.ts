import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EvaluationFileInstance } from '../../../_models/evaluationFileInstance';
import { AxisInstance } from '../../../_models/axisInstance';

@Component({
  selector: 'app-evaluation-file-instance-hr-card',
  templateUrl: './evaluation-file-instance-hr-card.component.html',
  styleUrls: ['./evaluation-file-instance-hr-card.component.css']
})
export class EvaluationFileInstanceHrCardComponent implements OnInit {
  @Input() evaluationFileInsatnce: EvaluationFileInstance;
  @Output() updateUserWeightEvent = new EventEmitter<AxisInstance>();
  constructor() { }

  ngOnInit() {

  }

  handleUpdateUserWeight(axisInstance: AxisInstance) {
    this.updateUserWeightEvent.emit(axisInstance);
  }
}
