import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { GoalEvaluation } from '../../_models/goalEvaluation';

import { Goal } from '../../_models/goal';
import { GoalEvaluationModalComponent } from '../goal-evaluation-modal/goal-evaluation-modal.component';

@Component({
  selector: 'app-auto-evaluation-goals',
  templateUrl: './auto-evaluation-goals.component.html',
  styleUrls: ['./auto-evaluation-goals.component.css']
})
export class AutoEvaluationGoalsComponent implements OnInit {
  @Input() goal: Goal;
  @Output() addGoalEvaluationEvent = new EventEmitter<any>();
  isCollapsed = true;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  bsModalRef: BsModalRef;


  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  toggleGoal() {
    this.isCollapsed = !this.isCollapsed;
  }

  addEvaluation() {
    const initialState = {
      goal: this.goal
    };

    this.bsModalRef = this.modalService.show(GoalEvaluationModalComponent, { initialState });
    this.bsModalRef.content.addGoalEvaluationEvent.subscribe((newEval) => {
      this.addGoalEvaluationEvent.emit(newEval);
    });
  }
}
