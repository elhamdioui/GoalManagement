import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() goalsByAxisInstanceList: GoalByAxisInstance[];
  @Input() goalTypeList: GoalType[];
  @Output() createGoalEvent = new EventEmitter<any>();
  @Output() editGoalEvent = new EventEmitter<Goal>();
  @Output() deleteGoalEvent = new EventEmitter<Goal>();
  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

  handleCreateGoal(newGoal: any) {
    this.createGoalEvent.emit(newGoal);
  }

  handleEditGoal(goal: Goal) {
    this.editGoalEvent.emit(goal);
  }

  handleDeleteGoal(goal: Goal) {
    this.deleteGoalEvent.emit(goal);
  }
}
