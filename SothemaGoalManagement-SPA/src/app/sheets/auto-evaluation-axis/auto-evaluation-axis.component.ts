import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';
import { Goal } from '../../_models/goal';
import { GoalEvaluation } from '../../_models/goalEvaluation';

@Component({
  selector: 'app-auto-evaluation-axis',
  templateUrl: './auto-evaluation-axis.component.html',
  styleUrls: ['./auto-evaluation-axis.component.css']
})
export class AutoEvaluationAxisComponent implements OnInit {
  @Input() goalsByAxisInstance: GoalByAxisInstance;
  @Input() evaluations: GoalEvaluation[];
  @Output() loadGoalEvaluationEvent = new EventEmitter<number>();
  isCollapsed = true;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  constructor() { }

  ngOnInit() {
  }


  handleLoadGoalEvaluation(goalId: number) {

    this.loadGoalEvaluationEvent.emit(goalId);
    // var total = this.goalsByAxisInstance.goals.reduce((accumulator, currentValue) => {
    //   return accumulator + currentValue.weight * (currentValue.completionRate === undefined ? 0 : currentValue.completionRate) * this.goalsByAxisInstance.userWeight / 10000
    // }, 0);

    // this.goalsByAxisInstance.axisGrade = total.toFixed(2)
  }
}
