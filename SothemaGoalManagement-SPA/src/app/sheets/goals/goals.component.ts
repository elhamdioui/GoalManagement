import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { AxisInstance } from '../../_models/axisInstance';
import { GoalByAxisInstance } from './../../_models/goalsByAxisInstance';
import { Goal } from '../../_models/goal';
import { GoalType } from '../../_models/goalType';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  @Input() axisInstances: AxisInstance[];
  @Input() areGoalsReadOnly: boolean;
  @Input() areGoalsCompleted: boolean;
  @Input() goalsByAxisInstanceList: GoalByAxisInstance[];
  @Input() goalTypeList: GoalType[];
  @Output() createGoalEvent = new EventEmitter<any>();
  @Output() editGoalEvent = new EventEmitter<Goal>();
  @Output() deleteGoalEvent = new EventEmitter<Goal>();
  @Output() validateGoalsEvent = new EventEmitter();
  @Output() cascadeMyGoalEvent = new EventEmitter<any>();
  isCollapsed = true;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  constructor() { }

  ngOnInit() {
  }

  handleCreateGoal(newGoal: any) {
    this.createGoalEvent.emit(newGoal);
  }

  handleEditGoal(goal: any) {
    this.editGoalEvent.emit(goal);
  }

  handleDeleteGoal(goal: Goal) {
    this.deleteGoalEvent.emit(goal);
  }

  validateGoals() {
    this.validateGoalsEvent.emit()
  }

  handleCascadeMyGoal(golasForCascade: any) {
    this.cascadeMyGoalEvent.emit(golasForCascade);
  }
}
