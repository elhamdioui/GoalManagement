import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AxisInstance } from '../../_models/axisInstance';
import { Goal } from '../../_models/goal';
import { GoalType } from '../../_models/goalType';

@Component({
  selector: 'app-goal-new',
  templateUrl: './goal-new.component.html',
  styleUrls: ['./goal-new.component.css']
})
export class GoalNewComponent implements OnInit {
  @Input() axisInstances: AxisInstance[];
  @Input() goalTypeList: GoalType[];
  @Output() createGoalEvent = new EventEmitter<any>();
  newGoal: any = {};

  constructor() { }

  ngOnInit() {
  }

  createGoal() {

    if (this.newGoal.goalTypeId != 3) {
      this.newGoal.projectName = '';
    }

    this.createGoalEvent.emit(this.newGoal);
    this.newGoal.description = '';
    this.newGoal.weight = '';
    this.newGoal.axisInstanceId = '';
    this.newGoal.goalTypeId = '';
    this.newGoal.projectName = '';
  }


}
