import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';
import { Goal } from '../../_models/goal';
import { GoalType } from '../../_models/goalType';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-sheet-detail',
  templateUrl: './sheet-detail.component.html',
  styleUrls: ['./sheet-detail.component.css']
})
export class SheetDetailComponent implements OnInit {
  sheetDetail: EvaluationFileInstance;
  goalList: Goal[];
  goalTypeList: GoalType[];
  loading = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData = data['resolvedData'];
      this.sheetDetail = resolvedData['sheetDetail'];
      this.goalTypeList = resolvedData['goalTypeList']
      this.getGoalsForAxis();
    });
  }

  getGoalsForAxis() {
    var axisInstanceIds = this.sheetDetail.axisInstances.map(a => a.id);
    this.loading = true;
    this.userService
      .getGoalsForAxis(this.authService.decodedToken.nameid, axisInstanceIds)
      .subscribe(
        (result: Goal[]) => {
          this.loading = false;
          this.goalList = result;
        },
        error => {
          this.loading = false;
          this.alertify.error('Impossible d\'avoir les objectifs');
        }
      );
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

  handleEditGoal(goal: Goal) {
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

  handleDeleteGoal(id: number) {
    this.alertify.confirm(
      'Etes-vous sur de vouloir supprimer cet objectif?',
      () => {
        this.loading = true;
        this.userService
          .deleteGoal(id, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.loading = false;
              this.getGoalsForAxis();
              this.alertify.success('L\'objectif a été supprimée');
            },
            error => {
              this.loading = false;
              this.alertify.error('Impossible de supprimer l\'objectif');
            }
          );
      }
    );
  }
}
