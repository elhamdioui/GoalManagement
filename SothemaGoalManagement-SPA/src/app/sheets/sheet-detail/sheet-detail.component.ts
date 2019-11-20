import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';
import { Goal } from '../../_models/goal';
import { GoalType } from '../../_models/goalType';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';
import { GoalEvaluation } from '../../_models/goalEvaluation';

@Component({
  selector: 'app-sheet-detail',
  templateUrl: './sheet-detail.component.html',
  styleUrls: ['./sheet-detail.component.css']
})
export class SheetDetailComponent implements OnInit {
  @Input() sheetToValidate: EvaluationFileInstance;
  @Output() switchOffDetailModeEvent = new EventEmitter();
  sheetDetail: EvaluationFileInstance;
  goalsByAxisInstanceList: GoalByAxisInstance[];
  goalTypeList: GoalType[];
  loading = false;
  areGoalsCompleted: boolean;
  areGoalsReadOnly: boolean;
  areGoalsEvaluable: boolean;
  totalGrade: string;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    if (this.sheetToValidate) {
      this.sheetDetail = this.sheetToValidate;
      this.getGoalsForAxis();
    } else {
      this.route.data.subscribe(data => {
        const resolvedData = data['resolvedData'];
        this.sheetDetail = resolvedData['sheetDetail'];
        this.goalTypeList = resolvedData['goalTypeList']
        this.getGoalsForAxis();
      });
    }
  }

  getGoalsForAxis() {
    var axisInstanceIds = this.sheetDetail.axisInstances.map(a => a.id);
    this.loading = true;
    this.userService
      .getGoalsForAxis(this.authService.decodedToken.nameid, axisInstanceIds)
      .subscribe(
        (result: GoalByAxisInstance[]) => {
          this.loading = false;
          this.goalsByAxisInstanceList = result;
          this.CanGoalsBeValidated();
          this.CheckReadOnly();
          this.CanGoalsBeEvaluated();
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }

  CheckReadOnly() {
    if (this.goalsByAxisInstanceList.filter(g => g.goalsStatus === 'Pas encore créé' || g.goalsStatus == 'Rédaction').length == 0) {
      this.areGoalsReadOnly = true;
    } else {
      this.areGoalsReadOnly = false;
    }
    return this.areGoalsReadOnly;
  }

  handleCreateGoal(newGoal: any) {
    this.loading = true;
    this.userService.createGoal(this.authService.decodedToken.nameid, newGoal).subscribe(
      () => {
        this.loading = false;
        this.getGoalsForAxis();
        this.alertify.success('Objectif est créé avec succèes');
      },
      error => {
        this.loading = false;
        this.alertify.error(error);
      }
    );
  }

  handleEditGoal(goal: any) {
    this.loading = true;
    this.userService.updateGoal(goal.id, this.authService.decodedToken.nameid, goal).subscribe(() => {
      this.loading = false;
      this.alertify.success('Objectif a été mis à jour.');
      this.getGoalsForAxis();
    }, error => {
      this.loading = false;
      this.alertify.error(error);
    })
  }

  handleDeleteGoal(goal: Goal) {
    this.alertify.confirm('Supprimer',
      `Etes-vous sur de vouloir supprimer l'objectif: ${goal.description}?`,
      () => {
        this.loading = true;
        this.userService
          .deleteGoal(goal.id, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.loading = false;
              this.getGoalsForAxis();
              this.alertify.success('L\'objectif a été supprimée');
            },
            error => {
              this.loading = false;
              this.alertify.error(error);
            }
          );
      }
    );
  }

  CanGoalsBeValidated() {
    if (this.goalsByAxisInstanceList.filter(g => g.totalGoalWeight != 100).length == 0) {
      this.areGoalsCompleted = true;
    } else {
      this.areGoalsCompleted = false;
    }
    return this.areGoalsCompleted;
  }

  CanGoalsBeEvaluated() {
    if (this.goalsByAxisInstanceList.filter(g => g.goalsStatus === 'Publiée').length == 0) {
      this.areGoalsEvaluable = false;
    } else {
      this.areGoalsEvaluable = true;
    }
    return this.areGoalsEvaluable;
  }

  handleValidateGoals() {
    this.loading = true;

    var goals: any[] = [];
    this.goalsByAxisInstanceList.forEach(a => {
      a.goals.forEach(g => goals.push({
        id: g.id,
        description: this.sheetDetail.title,//For logs
        goalTypeId: g.goalType.id,
        axisInstanceId: g.axisInstance.id,
        weight: g.weight,
        status: 'En Revue',
        sheetTitle: this.sheetDetail.title,
        emailContent: `S'il vous plaît valider les objectives pour la fiche d'évaluation ${this.sheetDetail.title}.`,
        sheetOwnerId: this.sheetDetail.ownerId

      }));
    });

    this.userService
      .validateGoals(this.authService.decodedToken.nameid, goals)
      .subscribe(
        () => {
          this.loading = false;
          this.areGoalsReadOnly = true;
          this.getGoalsForAxis();
          this.alertify.success('Les objectives ont été envoyées pour validation');
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }

  saveAutoEvaluation() {
    console.log('List:', this.goalsByAxisInstanceList);
  }

  handleAddGoalEvaluation(newEval: any) {
    this.loading = true;
    let goalEval = { ...newEval, evaluatorId: this.authService.decodedToken.nameid };
    this.userService
      .addGoalEvaluations(this.authService.decodedToken.nameid, goalEval)
      .subscribe(
        () => {
          this.loading = false;
          this.getGoalsForAxis();
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }

  returnToList() {
    if (this.sheetToValidate) {
      this.switchOffDetailModeEvent.emit();
    } else {
      this.router.navigate(['/sheets']);
    }
  }
}
