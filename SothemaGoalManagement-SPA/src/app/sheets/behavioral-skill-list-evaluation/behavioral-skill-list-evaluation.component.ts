import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { BehavioralSkillInstance } from '../../_models/behavioralSkillInstance';
import { AlertifyService } from '../../_services/alertify.service';

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
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  constructor(private alertify: AlertifyService) { }

  ngOnInit() {
    this.evals = this.behavioralSkillInstanceList.map(behavioralSkillInstance => ({
      grade: behavioralSkillInstance.behavioralSkillGrade,
      level: behavioralSkillInstance.behavioralSkillLevel,
      behavioralSkillInstanceId: behavioralSkillInstance.id,
      evaluateeId: this.sheetOwnerId,
      evaluationFileInstanceId: this.sheetId
    }));
  }

  changeEventInRadioButton(behavioralSkillInstance: BehavioralSkillInstance, newGrade: string) {
    let newEval = {
      grade: parseInt(newGrade),
      level: this.getLevel(behavioralSkillInstance, newGrade),
      behavioralSkillInstanceId: behavioralSkillInstance.id,
      evaluateeId: this.sheetOwnerId,
      evaluationFileInstanceId: this.sheetId
    };

    this.evals.splice(this.evals.findIndex(e => e.behavioralSkillInstanceId === behavioralSkillInstance.id), 1, newEval);
    console.log('clicked:', this.evals);
  }

  getLevel(behavioralSkillInstance: BehavioralSkillInstance, grade: string) {
    if (grade == behavioralSkillInstance.levelOneGrade.toString()) return behavioralSkillInstance.levelOne;
    if (grade == behavioralSkillInstance.levelTwoGrade.toString()) return behavioralSkillInstance.levelTwo;
    if (grade == behavioralSkillInstance.levelThreeGrade.toString()) return behavioralSkillInstance.levelThree;
    if (grade == behavioralSkillInstance.levelFourGrade.toString()) return behavioralSkillInstance.levelFour;

    return '';
  }

  save() {
    this.alertify.confirm('Confirmer',
      `Etes-vous sur de vouloir ajouter cette évaluation:
        <ul>
        ${this.evals.map(e => "<li>" + this.behavioralSkillInstanceList.find(b => b.id === e.behavioralSkillInstanceId).skill + ": " + e.level + "</li>").join("")}
        </ul>
        `,
      () => {
        this.addBehavioralSkillEvaluationEvent.emit(this.evals);
      }
    );
  }

  levelSelected(description) {
    this.description = description;
    this.displayDefinition = true;
  }
}
