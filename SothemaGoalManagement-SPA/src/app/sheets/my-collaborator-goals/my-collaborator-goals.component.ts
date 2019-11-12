import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
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
  @Output() switchOffGoalsEvent = new EventEmitter<boolean>();
  @Output() rejectGoalsEvent = new EventEmitter<any>();
  @Output() acceptGoalsEvent = new EventEmitter<any>();
  areGoalsReadOnly = true;
  canGoalsBeValidated = false;

  constructor(private alertify: AlertifyService) { }

  ngOnInit() {
    if (this.goalsByAxisInstanceList[0].goalsStatus === 'En Revue') {
      this.canGoalsBeValidated = true;
    }
  }

  returnToSheets() {
    this.switchOffGoalsEvent.emit(false);
  }

  rejectGoals() {
    this.alertify.prompt('Rejeter', `Quelle est la raison de votre renvoi des objectifs de ${this.sheetToValidate.ownerName}?`, '', (v) => {

      var goals: any[] = [];
      this.goalsByAxisInstanceList.forEach(a => {
        a.goals.forEach(g => goals.push({
          id: g.id,
          description: g.description,
          goalTypeId: g.goalType.id,
          axisInstanceId: g.axisInstance.id,
          weight: g.weight,
          status: 'Rédaction',
          sheetTitle: this.sheetToValidate.title,
          emailContent: `${v}`,
          sheetOwnerId: this.sheetToValidate.ownerId
        }));
      });

      var rejectionData = { goals: goals };
      this.rejectGoalsEvent.emit(rejectionData);
      this.switchOffGoalsEvent.emit(false);
    })
  }

  acceptGoals() {
    var goals: any[] = [];
    this.goalsByAxisInstanceList.forEach(a => {
      a.goals.forEach(g => goals.push({
        id: g.id,
        description: g.description,
        goalTypeId: g.goalType.id,
        axisInstanceId: g.axisInstance.id,
        weight: g.weight,
        status: 'Publiée',
        sheetTitle: this.sheetToValidate.title,
        emailContent: `Les objectives ont été acceptées pour la fiche ${this.sheetToValidate.title}.`,
        sheetOwnerId: this.sheetToValidate.ownerId
      }));
    });

    var acceptanceData = { goals: goals };
    this.acceptGoalsEvent.emit(acceptanceData);
    this.switchOffGoalsEvent.emit(false);
  }
}
