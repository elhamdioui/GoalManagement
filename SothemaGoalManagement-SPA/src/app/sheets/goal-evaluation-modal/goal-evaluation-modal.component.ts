import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Goal } from '../../_models/goal';

@Component({
  selector: 'app-goal-evaluation-modal',
  templateUrl: './goal-evaluation-modal.component.html',
  styleUrls: ['./goal-evaluation-modal.component.css']
})
export class GoalEvaluationModalComponent implements OnInit {
  @Output() addGoalEvaluationEvent = new EventEmitter<any>();
  goal: Goal;
  newEval: any;


  constructor(public bsModalRef: BsModalRef) { }


  ngOnInit() {
    this.newEval = { completionRate: 0, comment: '', goalId: this.goal.id };
  }

  addEvaluation() {
    this.addGoalEvaluationEvent.emit(this.newEval);
    this.bsModalRef.hide();
  }

}
