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
  @Output() updateGoalEvent = new EventEmitter();
  goal: Goal;
  axisList: Axis[];
  goalTypeList: GoalType[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  updateGoal() {
    this.updateGoalEvent.emit(this.goal);
    this.bsModalRef.hide();
  }
}
