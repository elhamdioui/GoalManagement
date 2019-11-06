import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';
import { AxisInstance } from '../../_models/axisInstance';

@Component({
  selector: 'app-my-collaborators-sheets',
  templateUrl: './my-collaborators-sheets.component.html',
  styleUrls: ['./my-collaborators-sheets.component.css']
})
export class MyCollaboratorsSheetsComponent implements OnInit {
  @Input() sheetsToValidate: EvaluationFileInstance[];
  @Output() updateUserWeightEvent = new EventEmitter<AxisInstance>();

  constructor() { }

  ngOnInit() {
  }

  handleUpdateUserWeight(axisInstance: AxisInstance) {
    this.updateUserWeightEvent.emit(axisInstance);
  }
}
