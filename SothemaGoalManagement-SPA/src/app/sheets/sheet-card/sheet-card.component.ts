import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown, faCaretUp, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';
import { AxisInstance } from '../../_models/axisInstance';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';

@Component({
  selector: 'app-sheet-card',
  templateUrl: './sheet-card.component.html',
  styleUrls: ['./sheet-card.component.css']
})
export class SheetCardComponent implements OnInit {
  @Input() sheetToValidate: EvaluationFileInstance;
  @Output() updateUserWeightEvent = new EventEmitter<AxisInstance>();
  goalsByAxisInstanceList: GoalByAxisInstance[];
  axisInstanceList: AxisInstance[];
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  faCheckSquare = faCheckSquare;
  isCollapsed = false;
  goalsMode = false;
  loading = false;

  constructor(private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.axisInstanceList = this.sheetToValidate.axisInstances;
  }

  handleUpdateUserWeight(axisInstance: AxisInstance) {
    this.updateUserWeightEvent.emit(axisInstance);
  }

  getGoals() {
    this.loading = true;
    var axisInstanceIds = this.sheetToValidate.axisInstances.map(a => a.id);
    this.userService.getGoalsForAxis(this.authService.decodedToken.nameid, axisInstanceIds).subscribe(
      (res: GoalByAxisInstance[]) => {
        this.loading = false;
        this.goalsByAxisInstanceList = res;
        this.goalsMode = true;
      },
      error => {
        this.loading = false;
        this.alertify.error(error);
      }
    );
  }

  switchOffGoalsMode() {
    this.goalsMode = false;
  }

  handleRejectGoals() {
    this.alertify.prompt('Rejeter', `Quelle est la raison du rejet des objectifs de ${this.sheetToValidate.ownerName}?`, '', (v) => {
      this.loading = true;
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

      this.userService
        .validateGoals(this.authService.decodedToken.nameid, goals)
        .subscribe(
          () => {
            this.loading = false;
            this.goalsMode = false;
            this.alertify.success('Les objectives ont été rejetées');
          },
          error => {
            this.loading = false;
            this.alertify.error('Impossible de valider les objectives');
          }
        );
    })
  }

  handleAcceptGoals() {
    this.loading = true;
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

    this.userService
      .validateGoals(this.authService.decodedToken.nameid, goals)
      .subscribe(
        () => {
          this.loading = false;
          this.goalsMode = false;
          this.alertify.success('Les objectives ont été rejetées');
        },
        error => {
          this.loading = false;
          this.alertify.error('Impossible de valider les objectives');
        }
      );
  }
}
