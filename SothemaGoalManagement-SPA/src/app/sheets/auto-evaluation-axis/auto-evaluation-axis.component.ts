import { filter } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown, faCaretUp, faHistory, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';
import { Goal } from '../../_models/goal';
import { GoalEvaluationModalComponent } from '../goal-evaluation-modal/goal-evaluation-modal.component';
import { HistoricalEvaluationModalComponent } from '../historical-evaluation-modal/historical-evaluation-modal.component';

@Component({
  selector: 'app-auto-evaluation-axis',
  templateUrl: './auto-evaluation-axis.component.html',
  styleUrls: ['./auto-evaluation-axis.component.css']
})
export class AutoEvaluationAxisComponent implements OnInit {
  @Input() goalsByAxisInstance: GoalByAxisInstance;
  @Input() sheetOwnerId: number;
  @Output() addGoalEvaluationEvent = new EventEmitter<any>();
  isCollapsed: boolean;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  faHistory = faHistory;
  faPlus = faPlus;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.isCollapsed = false;
  }

  handleAddGoalEvaluation(newEval: any) {
    this.addGoalEvaluationEvent.emit(newEval);
  }

  showEvaluations(goal) {
    const initialState = {
      goal: goal
    };

    this.bsModalRef = this.modalService.show(HistoricalEvaluationModalComponent, { initialState, class: 'modal-lg' });
  }

  addEvaluation(goal) {
    const initialState = {
      goal: goal,
      evaluateeId: this.sheetOwnerId
    };

    this.bsModalRef = this.modalService.show(GoalEvaluationModalComponent, { initialState });
    this.bsModalRef.content.addGoalEvaluationEvent.subscribe((newEval) => {
      this.addGoalEvaluationEvent.emit(newEval);
    });
  }
}
