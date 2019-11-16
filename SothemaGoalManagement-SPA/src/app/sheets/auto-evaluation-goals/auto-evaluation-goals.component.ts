import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { GoalEvaluation } from '../../_models/goalEvaluation';

import { Goal } from '../../_models/goal';

@Component({
  selector: 'app-auto-evaluation-goals',
  templateUrl: './auto-evaluation-goals.component.html',
  styleUrls: ['./auto-evaluation-goals.component.css']
})
export class AutoEvaluationGoalsComponent implements OnInit {
  @Input() goal: Goal;
  @Input() evaluations: GoalEvaluation[];
  @Output() loadGoalEvaluationEvent = new EventEmitter<number>();
  isCollapsed = true;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  constructor() { }

  ngOnInit() {

  }

  toggleGoal() {
    this.isCollapsed = !this.isCollapsed;
    if (!this.isCollapsed) {
      this.loadGoalEvaluationEvent.emit(this.goal.id);
    }
  }
}
