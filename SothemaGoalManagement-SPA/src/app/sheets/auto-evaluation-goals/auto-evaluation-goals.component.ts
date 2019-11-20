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
    this.goal.goalEvaluations.sort(this.compareValues('created', 'desc'))
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

  compareValues(key, order = 'asc') {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }
}
