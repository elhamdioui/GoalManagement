import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

import { Goal } from '../../_models/goal';
import { Evaluator } from '../../_models/evaluator';
import { AdminService } from '../../_services/admin.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-cascade-my-goals-modal',
  templateUrl: './cascade-my-goals-modal.component.html',
  styleUrls: ['./cascade-my-goals-modal.component.css']
})
export class CascadeMyGoalsModalComponent implements OnInit {
  @Output() cascadeMyGoalEvent = new EventEmitter<any[]>();
  myGoal: Goal;
  axisInstanceTitle: string;
  cascadededGoal: any = {};
  evaluatees: Evaluator[];
  cascadededGoals: any[];
  loading = false;
  selectedAll: boolean;
  usersGoalWeights: any[] = [];

  constructor(public bsModalRef: BsModalRef, private adminService: AdminService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.cascadededGoal = {
      'description': this.myGoal.description,
      'axisInstanceId': this.myGoal.axisInstance.id,
      'goalTypeId': this.myGoal.goalType.id,
      'projectName': this.myGoal.projectName,
      'weight': 0,
      'status': this.myGoal.status
    };
    this.loadMyEvaluatees();
  }

  loadMyEvaluatees() {
    this.loading = true;
    this.adminService
      .loadEvaluatees(this.authService.decodedToken.nameid)
      .subscribe(
        (evaluatees: Evaluator[]) => {
          this.loading = false;
          this.evaluatees = evaluatees;
          this.constructData();
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }

  constructData() {
    this.evaluatees.forEach(evaluatee => {
      let usersGoalWeight = { evaluatee: evaluatee, cascadededGoal: this.cascadededGoal, selected: false, parentGoalId: this.myGoal.id, axisInstanceTitle: this.axisInstanceTitle };
      this.usersGoalWeights.push(usersGoalWeight);
    })
  }
  selectAll() {
    this.selectedAll = !this.selectedAll;
    for (var i = 0; i < this.usersGoalWeights.length; i++) {
      this.usersGoalWeights[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    var totalSelected = 0;
    for (var i = 0; i < this.usersGoalWeights.length; i++) {
      if (this.usersGoalWeights[i].selected) totalSelected++;
    }
    this.selectedAll = totalSelected === this.usersGoalWeights.length;

    return true;
  }

  cascadeGoal() {
    this.cascadeMyGoalEvent.emit(this.usersGoalWeights);
    this.bsModalRef.hide();
  }

  disableAction() {
    if (this.usersGoalWeights === undefined) return true;
    for (var i = 0; i < this.usersGoalWeights.length; i++) {
      if (this.usersGoalWeights[i].selected) {
        return false;
      }
    }
    return true;
  }

  setWeight(weight: number, evaluateeId: number) {
    console.log(`weight: ${weight} for evaluatedId: ${evaluateeId}`);
    for (var i = 0; i < this.usersGoalWeights.length; i++) {
      if (this.usersGoalWeights[i].evaluatee.id == evaluateeId) {
        this.usersGoalWeights[i].cascadededGoal.weight = weight;
        console.log(`Set weight: ${weight} for evaluatedId: ${evaluateeId}`);
      }
    }
  }
}
