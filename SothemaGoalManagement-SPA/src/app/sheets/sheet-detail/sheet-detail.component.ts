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
          console.log('this.goalList:', this.goalList);
        },
        error => {
          this.loading = false;
          this.alertify.error('Impossible d\'avoir les objectifs');
        }
      );
  }
}
