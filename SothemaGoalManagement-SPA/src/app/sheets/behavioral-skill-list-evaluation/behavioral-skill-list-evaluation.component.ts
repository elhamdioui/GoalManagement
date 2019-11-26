import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehavioralSkillInstance } from '../../_models/behavioralSkillInstance';

@Component({
  selector: 'app-behavioral-skill-list-evaluation',
  templateUrl: './behavioral-skill-list-evaluation.component.html',
  styleUrls: ['./behavioral-skill-list-evaluation.component.css']
})
export class BehavioralSkillListEvaluationComponent implements OnInit {
  @Input() behavioralSkillInstanceList: BehavioralSkillInstance[];
  @Input() sheetId: number;
  @Input() sheetOwnerId: number;
  @Input() areBehavioralSkillsEvaluable: boolean;
  @Output() addBehavioralSkillEvaluationEvent = new EventEmitter<any[]>();
  displayDefinition: boolean;
  description: string;
  evals: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  changeEventInRadioButton(behavioralSkillInstance: BehavioralSkillInstance) {
    let newEval = { grade: 0, level: '', behavioralSkillInstanceId: behavioralSkillInstance.id, evaluateeId: this.sheetOwnerId, evaluationFileInstanceId: this.sheetId };
    switch (behavioralSkillInstance.behavioralSkillGrade) {
      case behavioralSkillInstance.levelOneGrade:
        newEval.grade = behavioralSkillInstance.levelOneGrade;
        newEval.level = behavioralSkillInstance.levelOne;
        break;
      case behavioralSkillInstance.levelTwoGrade:
        newEval.grade = behavioralSkillInstance.levelTwoGrade;
        newEval.level = behavioralSkillInstance.levelTwo;
        break;
      case behavioralSkillInstance.levelThreeGrade:
        newEval.grade = behavioralSkillInstance.levelThreeGrade;
        newEval.level = behavioralSkillInstance.levelThree;
        break;
      case behavioralSkillInstance.levelFourGrade:
        newEval.grade = behavioralSkillInstance.levelFourGrade;
        newEval.level = behavioralSkillInstance.levelFour;
        break;
    }
    this.evals.push(newEval);
  }

  Save() {
    this.addBehavioralSkillEvaluationEvent.emit(this.evals);
  }

  levelSelected(description) {
    this.description = description;
    this.displayDefinition = true;
  }
}
