import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AxisInstance } from '../../_models/axisInstance';
import { Goal } from '../../_models/goal';
import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';

@Component({
  selector: 'app-goals-evaluation',
  templateUrl: './goals-evaluation.component.html',
  styleUrls: ['./goals-evaluation.component.css']
})
export class GoalsEvaluationComponent implements OnInit {
  @Input() goalsByAxisInstanceList: GoalByAxisInstance[];
  @Output() evalGoalEvent = new EventEmitter<any>();
  axisInstances: any[];
  goals: Goal[];
  newEval: any = {};

  constructor() { }

  ngOnInit() {
   this.axisInstances = this.goalsByAxisInstanceList.map(gai => ({id: gai.axisInstanceId, title: gai.title}));
  }

  evalGoal() {
      this.evalGoalEvent.emit(this.newEval);
      this.newEval.description = '';
      this.newEval.compleationRate = 0;
      this.newEval.axisInstanceId = '';
      this.newEval.GoalId = '';
  }

  onChange(axisInstanceId) {
    this.goals = this.goalsByAxisInstanceList.filter(gai => gai.axisInstanceId === axisInstanceId)[0].goals;
  }

}
