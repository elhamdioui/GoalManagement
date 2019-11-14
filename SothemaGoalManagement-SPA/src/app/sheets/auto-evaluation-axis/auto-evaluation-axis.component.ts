import { Component, OnInit, Input } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';
import { Goal } from '../../_models/goal';

@Component({
  selector: 'app-auto-evaluation-axis',
  templateUrl: './auto-evaluation-axis.component.html',
  styleUrls: ['./auto-evaluation-axis.component.css']
})
export class AutoEvaluationAxisComponent implements OnInit {
  @Input() goalsByAxisInstance: GoalByAxisInstance;
  isCollapsed = true;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  constructor() { }

  ngOnInit() {
  }


  handleCalculateAxisGrade(goal: Goal) {
    var total = this.goalsByAxisInstance.goals.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.weight * (currentValue.completionRate === undefined ? 0 : currentValue.completionRate) * this.goalsByAxisInstance.userWeight / 10000
    }, 0);

    this.goalsByAxisInstance.axisGrade = total.toFixed(2)
  }
}
