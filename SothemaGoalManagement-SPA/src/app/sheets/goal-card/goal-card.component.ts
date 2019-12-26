import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { faEdit, faTrash, faCaretDown, faCaretUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

import { GoalByAxisInstance } from './../../_models/goalsByAxisInstance';
import { Goal } from '../../_models/goal';
import { GoalType } from '../../_models/goalType';
import { AxisInstance } from '../../_models/axisInstance';
import { GoalEditModalComponent } from '../goal-edit-modal/goal-edit-modal.component';
import { CascadeMyGoalsModalComponent } from '../cascade-my-goals-modal/cascade-my-goals-modal.component';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.css']
})
export class GoalCardComponent implements OnInit {
  @Input() goalsByAxisInstance: GoalByAxisInstance;
  @Input() areGoalsReadOnly: boolean;
  @Input() sheetId: number;
  @Input() axisInstances: AxisInstance[];
  @Input() goalTypeList: GoalType[];
  @Input() ownerName: string;
  @Output() editGoalEvent = new EventEmitter<any>();
  @Output() cascadeMyGoalEvent = new EventEmitter<any>();
  @Output() deleteGoalEvent = new EventEmitter<Goal>();
  bsModalRef: BsModalRef;
  isCollapsed: boolean;
  faEdit = faEdit;
  faTrash = faTrash;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  faArrowAltCircleDown = faArrowAltCircleDown;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.isCollapsed = true;
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

  cascadeGoal(myGoal: Goal) {
    const initialState = {
      myGoal,
      axisInstanceTitle: this.goalsByAxisInstance.title
    };

    this.bsModalRef = this.modalService.show(CascadeMyGoalsModalComponent, { initialState, class: 'modal-lg' });
    this.bsModalRef.content.cascadeMyGoalEvent.subscribe((golasForCascade) => {
      this.cascadeMyGoalEvent.emit(golasForCascade);
    });
  }
}
