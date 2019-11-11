import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown, faCaretUp, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';
import { AxisInstance } from '../../_models/axisInstance';

@Component({
  selector: 'app-sheet-card',
  templateUrl: './sheet-card.component.html',
  styleUrls: ['./sheet-card.component.css']
})
export class SheetCardComponent implements OnInit {
  @Input() sheetToValidate: EvaluationFileInstance;
  @Output() updateUserWeightEvent = new EventEmitter<AxisInstance>();
  axisInstanceList: AxisInstance[];
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  faCheckSquare = faCheckSquare;
  isCollapsed = false;

  constructor() { }

  ngOnInit() {
    this.axisInstanceList = this.sheetToValidate.axisInstances;
  }

  handleUpdateUserWeight(axisInstance: AxisInstance) {
    this.updateUserWeightEvent.emit(axisInstance);
  }

  consultGoals(sheetToValidateId) {

  }
}
