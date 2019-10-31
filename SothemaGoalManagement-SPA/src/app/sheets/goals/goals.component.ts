import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { AxisInstance } from '../../_models/axisInstance';
import { Goal } from '../../_models/goal';
import { GoalType } from '../../_models/goalType';
import { GoalEditModalComponent } from '../goal-edit-modal/goal-edit-modal.component';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  @Input() axisInstances: AxisInstance[];
  @Input() goalList: Goal[];
  @Input() goalTypeList: GoalType[];
  @Output() createGoalEvent = new EventEmitter<any>();
  @Output() editGoalEvent = new EventEmitter<Goal>();
  @Output() deleteGoalEvent = new EventEmitter<number>();
  isCollapsed = true;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  handleCreateGoal(newGoal: any) {
    this.createGoalEvent.emit(newGoal);
  }

  editGoalModal(goal: Goal) {
    const initialState = {
      goal,
      goalTypeList: this.goalTypeList,
      axisList: this.axisInstances
    };

    this.bsModalRef = this.modalService.show(GoalEditModalComponent, { initialState });
    this.bsModalRef.content.editGoalEvent.subscribe((updatedGoal) => {
      this.editGoalEvent.emit(updatedGoal);
    });
  }

  deleteGoal(id: number) {
    this.deleteGoalEvent.emit(id);
  }
}
