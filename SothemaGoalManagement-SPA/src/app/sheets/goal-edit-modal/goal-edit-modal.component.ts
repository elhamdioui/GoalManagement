import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Goal } from '../../_models/goal';
import { GoalType } from '../../_models/goalType';
import { Axis } from '../../_models/axis';


@Component({
  selector: 'app-goal-edit-modal',
  templateUrl: './goal-edit-modal.component.html',
  styleUrls: ['./goal-edit-modal.component.css']
})
export class GoalEditModalComponent implements OnInit {
  @Output() editGoalEvent = new EventEmitter<any>();
  goal: Goal;
  axisList: Axis[];
  goalTypeList: GoalType[];
  updatedGoal: any = {};

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.updatedGoal = {
      'id': this.goal.id,
      'description': this.goal.description,
      'axisInstanceId': this.goal.axisInstance.id,
      'goalTypeId': this.goal.goalType.id,
      'weight': this.goal.weight,
      'status': this.goal.status
    }
  }

  updateGoal() {

    this.editGoalEvent.emit(this.updatedGoal);
    this.bsModalRef.hide();
  }
}
