import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';
import { GoalEvaluation } from '../../_models/goalEvaluation';

@Component({
  selector: 'app-auto-evaluation',
  templateUrl: './auto-evaluation.component.html',
  styleUrls: ['./auto-evaluation.component.css']
})
export class AutoEvaluationComponent implements OnInit {
  @Input() goalsByAxisInstanceList: GoalByAxisInstance[];
  @Input() areGoalsEvaluable: boolean;
  @Output() addGoalEvaluationEvent = new EventEmitter<any>();
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  isCollapsed = false;
  totalGrade: string;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    let total = this.goalsByAxisInstanceList.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.axisGrade), 0);
    this.totalGrade = total.toFixed(2);
  }

  handleAddGoalEvaluation(newEval: any) {
    this.addGoalEvaluationEvent.emit(newEval);
  }
}
