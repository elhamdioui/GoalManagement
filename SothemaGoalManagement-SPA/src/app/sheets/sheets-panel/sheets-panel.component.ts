import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';;
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { Pagination, PaginatedResult } from '../../_models/pagination';
import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Goal } from '../../_models/goal';
import { GoalEditModalComponent } from '../goal-edit-modal/goal-edit-modal.component';
import { AxisInstance } from '../../_models/axisInstance';
import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';

@Component({
  selector: 'app-sheets-panel',
  templateUrl: './sheets-panel.component.html',
  styleUrls: ['./sheets-panel.component.css']
})
export class SheetsPanelComponent implements OnInit {
  pagination: Pagination;
  sheets: EvaluationFileInstance[];
  sheetToValidate: EvaluationFileInstance;
  sheetsToValidate: EvaluationFileInstance[];
  loading = false;
  goalList: Goal[];
  bsModalRef: BsModalRef;
  goalsByAxisInstanceList: GoalByAxisInstance[];
  goalsMode = false;

  constructor(private modalService: BsModalService, private route: ActivatedRoute, private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData = data['resolvedData'];
      this.sheetsToValidate = resolvedData['sheetsToValidate'];
      this.sheets = resolvedData['sheets'].result;
      this.pagination = resolvedData['sheets'].pagination;
    });
  }

  loadSheets() {
    this.loading = true;
    this.userService
      .getMySheets(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage
      )
      .subscribe(
        (res: PaginatedResult<EvaluationFileInstance[]>) => {
          this.loading = false;
          this.sheets = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }

  handleDeleteGoal(id: number) {
    this.alertify.confirm('Supprimer',
      'Etes-vous sur de vouloir supprimer cet objectif?',
      () => {
        this.loading = true;
        this.userService
          .deleteGoal(id, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.loading = false;
              this.goalList.splice(
                this.goalList.findIndex(a => a.id === id),
                1
              );
              this.alertify.success('L\'objectif a été supprimé');
            },
            error => {
              this.loading = false;
              this.alertify.error('Impossible de supprimer l\'objectif');
            }
          );
      }
    );
  }

  editAxisModal(goal: Goal) {
    const initialState = {
      goal
    };

    this.bsModalRef = this.modalService.show(GoalEditModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedGoal.subscribe((updatedGoal) => {
      this.loading = true;
      this.userService.updateGoal(goal.id, this.authService.decodedToken.nameid, updatedGoal).subscribe(() => {
        this.loading = false;
        this.alertify.success('L\'objectif été mis à jour.');
      }, error => {
        this.loading = false;
        this.alertify.error(error);
      })

    });
  }

  handlePageChanged(event: any): void {
    this.pagination.currentPage = event.currentPage;
    this.loadSheets();
  }

  handleUpdateUserWeight(axisInstance: AxisInstance) {
    this.loading = true;
    this.userService
      .updateAxisInstance(
        this.authService.decodedToken.nameid,
        axisInstance.id,
        axisInstance.userWeight
      )
      .subscribe(
        () => {
          this.loading = false;
          this.alertify.success('La pondération de l\'employée est modifié avec succès.');
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }

  handleRejectGoals(event: any) {
    this.loading = true;
    this.userService
      .validateGoals(this.authService.decodedToken.nameid, event.goals)
      .subscribe(
        () => {
          this.loading = false;
          this.alertify.success('Les objectives ont été renvoyées');
        },
        error => {
          this.loading = false;
          this.alertify.error('Impossible de valider les objectives');
        }
      );
  }

  handleAcceptGoals(acceptanceData: any) {
    this.loading = true;
    this.userService
      .validateGoals(this.authService.decodedToken.nameid, acceptanceData.goals)
      .subscribe(
        () => {
          this.loading = false;
          this.alertify.success('Les objectives ont été rejetées');
        },
        error => {
          this.loading = false;
          this.alertify.error('Impossible de valider les objectives');
        }
      );
  }

  handleLoadGoals(loadGoalsData: any) {
    this.loading = true;
    this.userService.getGoalsForAxis(this.authService.decodedToken.nameid, loadGoalsData.axisInstanceIds).subscribe(
      (res: GoalByAxisInstance[]) => {
        this.loading = false;
        this.goalsByAxisInstanceList = res;
        this.goalsMode = true;
        this.sheetToValidate = loadGoalsData.sheetToValidate
      },
      error => {
        this.loading = false;
        this.alertify.error(error);
      }
    );
  }

  switchOffGoalsMode(event: boolean) {
    this.goalsMode = event;
  }
}
