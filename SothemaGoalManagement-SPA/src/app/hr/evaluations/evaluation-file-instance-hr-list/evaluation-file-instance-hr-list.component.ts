import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EvaluationFileInstance } from '../../../_models/evaluationFileInstance';
import { AxisInstance } from '../../../_models/axisInstance';

@Component({
  selector: 'app-evaluation-file-instance-hr-list',
  templateUrl: './evaluation-file-instance-hr-list.component.html',
  styleUrls: ['./evaluation-file-instance-hr-list.component.css']
})
export class EvaluationFileInstanceHrListComponent implements OnInit {
  @Input() evaluationFileInstanceList: EvaluationFileInstance[];
  @Output() updateUserWeightEvent = new EventEmitter<AxisInstance>();
  evaluationFileInstances: EvaluationFileInstance[];
  constructor() { }

  ngOnInit() {
  }


  handleUpdateUserWeight(axisInstance: AxisInstance) {
    this.updateUserWeightEvent.emit(axisInstance);
  }
}
