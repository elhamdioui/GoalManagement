import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { faEdit, faTrash, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { GoalByAxisInstance } from './../../_models/goalsByAxisInstance';
import { Goal } from '../../_models/goal';
import { GoalType } from '../../_models/goalType';
import { AxisInstance } from '../../_models/axisInstance';
import { GoalEditModalComponent } from '../goal-edit-modal/goal-edit-modal.component';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.css']
})
export class GoalCardComponent implements OnInit {
  @Input() goalsByAxisInstance: GoalByAxisInstance;
  @Input() axisInstances: AxisInstance[];
  @Input() goalTypeList: GoalType[];
  @Output() editGoalEvent = new EventEmitter<Goal>();
  @Output() deleteGoalEvent = new EventEmitter<Goal>();
  bsModalRef: BsModalRef;
  isCollapsed = false;
  faEdit = faEdit;
  faTrash = faTrash;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  editGoalModal(goal: Goal) {
    const initialState = {
      goal,
      goalTypeList: this.goalTypeList,
      axisList: this.axisInstances,
      goalsByAxisInstance: this.goalsByAxisInstance 
    };

    this.bsModalRef = this.modalService.show(GoalEditModalComponent, { initialState });
    this.bsModalRef.content.editGoalEvent.subscribe((updatedGoal) => {
      this.editGoalEvent.emit(updatedGoal);
    });
  }

  deleteGoal(goal: Goal) {
    this.deleteGoalEvent.emit(goal);
  }
}
