import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown, faCaretUp, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';
import { AxisInstance } from '../../_models/axisInstance';
import { AlertifyService } from '../../_services/alertify.service';
import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';

@Component({
  selector: 'app-sheet-card',
  templateUrl: './sheet-card.component.html',
  styleUrls: ['./sheet-card.component.css']
})
export class SheetCardComponent implements OnInit {
  @Input() sheetToValidate: EvaluationFileInstance;
  @Output() updateUserWeightEvent = new EventEmitter<AxisInstance>();
  @Output() loadGoalsEvent = new EventEmitter<any>();
  axisInstanceList: AxisInstance[];
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  faCheckSquare = faCheckSquare;
  isCollapsed = false;

  constructor(private alertify: AlertifyService) { }

  ngOnInit() {
    this.axisInstanceList = this.sheetToValidate.axisInstances;
  }

  handleUpdateUserWeight(axisInstance: AxisInstance) {
    this.updateUserWeightEvent.emit(axisInstance);
  }

  showGoals() {
    var axisInstanceIds = this.sheetToValidate.axisInstances.map(a => a.id);
    var loadGoalsData = { sheetToValidate: this.sheetToValidate, axisInstanceIds: axisInstanceIds };
    this.loadGoalsEvent.emit(loadGoalsData);
  }
}
