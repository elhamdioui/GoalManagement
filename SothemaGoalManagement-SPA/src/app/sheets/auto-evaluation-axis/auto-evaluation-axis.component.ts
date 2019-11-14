import { Component, OnInit, Input } from '@angular/core';
import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';
import { Goal } from '../../_models/goal';

@Component({
  selector: 'app-auto-evaluation-axis',
  templateUrl: './auto-evaluation-axis.component.html',
  styleUrls: ['./auto-evaluation-axis.component.css']
})
export class AutoEvaluationAxisComponent implements OnInit {
  @Input() goalsByAxisInstance: GoalByAxisInstance;
  constructor() { }

  ngOnInit() {
  }


  handleCalculateAxisGrade(goal: Goal) {
    this.goalsByAxisInstance.axisGrade = this.goalsByAxisInstance.goals.reduce((accumulator, currentValue) => {
      console.log('weight:', currentValue.weight);
      console.log('completionRate:', currentValue.completionRate);
      console.log('userWeight:', this.goalsByAxisInstance.userWeight);
      return accumulator + currentValue.weight * (currentValue.completionRate === undefined ? 0 : currentValue.completionRate) * this.goalsByAxisInstance.userWeight / 10000
    }, 0);

  }
}
