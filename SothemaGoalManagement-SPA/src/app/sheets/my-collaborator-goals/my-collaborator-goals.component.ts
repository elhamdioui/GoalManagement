import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';
import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';
import { PromptModalComponent } from '../../prompt-modal/prompt-modal.component';

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
  bsModalRef: BsModalRef;
  faArrowLeft = faArrowLeft;
  showDetail: boolean;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    if (this.goalsByAxisInstanceList[0].goalsStatus === 'En Revue') {
      this.canGoalsBeValidated = true;
    }
  }

  returnToSheets() {
    this.switchOffGoalsEvent.emit(false);
  }

  rejectGoals() {
    const initialState = {
      promptTitle: 'Renvoi',
      promptMessage: `Quelle est la raison de votre renvoi des objectifs de ${this.sheetToValidate.ownerName}?`
    };

    this.bsModalRef = this.modalService.show(PromptModalComponent, { initialState });
    this.bsModalRef.content.sendPromptValueEvent.subscribe((promptValue) => {
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
          emailContent: promptValue,
          sheetOwnerId: this.sheetToValidate.ownerId
        }));
      });

      var rejectionData = { goals: goals };
      this.rejectGoalsEvent.emit(rejectionData);
      this.switchOffGoalsEvent.emit(false);
    });
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
