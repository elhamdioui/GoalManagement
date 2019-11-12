import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';
import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';

@Component({
  selector: 'app-my-collaborator-goals',
  templateUrl: './my-collaborator-goals.component.html',
  styleUrls: ['./my-collaborator-goals.component.css']
})
export class MyCollaboratorGoalsComponent implements OnInit {
  @Input() goalsByAxisInstanceList: GoalByAxisInstance[];
  @Input() sheetToValidate: EvaluationFileInstance;
  @Output() switchOffGoalsEvent = new EventEmitter();
  @Output() rejectGoalsEvent = new EventEmitter();
  @Output() AcceptGoalsEvent = new EventEmitter();
  areGoalsReadOnly = true;
  areGoalsPublished = false;

  constructor() { }

  ngOnInit() {
    if (this.goalsByAxisInstanceList[0].goalsStatus === 'Publiée') {
      this.areGoalsPublished = true;
    }
  }

  returnToSheets() {
    this.switchOffGoalsEvent.emit();
  }

  rejectGoals() {
    this.rejectGoalsEvent.emit();
  }

  acceptGoals() {
    this.AcceptGoalsEvent.emit();
  }
}
