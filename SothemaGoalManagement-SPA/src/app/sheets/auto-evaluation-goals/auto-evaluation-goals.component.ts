import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import {GoalsEvaluation} from '../../_models/goalsEvaluation';

import { Goal } from '../../_models/goal';

@Component({
  selector: 'app-auto-evaluation-goals',
  templateUrl: './auto-evaluation-goals.component.html',
  styleUrls: ['./auto-evaluation-goals.component.css']
})
export class AutoEvaluationGoalsComponent implements OnInit {
  @Input() goal: Goal;
  @Input() evaluations: GoalsEvaluation;
  @Output() calculateAxisGradeEvent = new EventEmitter<Goal>();
  isCollapsed = true;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  constructor() { }

  ngOnInit() {
    this.calculateAxisGradeEvent.emit(this.goal);
  }

  onBlur() {
    this.calculateAxisGradeEvent.emit(this.goal);
  }
}
