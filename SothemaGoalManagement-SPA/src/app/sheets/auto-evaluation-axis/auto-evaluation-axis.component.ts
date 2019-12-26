import { filter } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() goalIdToExpand: number;
  @Input() sheetOwnerId: number;
  @Output() addGoalEvaluationEvent = new EventEmitter<any>();
  isCollapsed: boolean;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  constructor() { }

  ngOnInit() {
    this.isCollapsed = false;
    if (this.goalIdToExpand && this.goalsByAxisInstance.goals.filter(g => g.id == this.goalIdToExpand).length > 0) {
      this.isCollapsed = false;
    }
  }

  handleAddGoalEvaluation(newEval: any) {
    this.addGoalEvaluationEvent.emit(newEval);
  }
}
