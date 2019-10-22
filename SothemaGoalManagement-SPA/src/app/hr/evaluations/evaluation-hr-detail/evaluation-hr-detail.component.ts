import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { EvaluationFile } from '../../../_models/evaluationFile';
import { EvaluationFileInstance } from '../../../_models/evaluationFileInstance';
import { User } from '../../../_models/user';
import { HrService } from '../../../_services/hr.service';
import { AuthService } from '../../../_services/auth.service';
import { AlertifyService } from '../../../_services/alertify.service';
import { UserStatus } from '../../../_models/userStatus';
import { AdminService } from '../../../_services/admin.service';

@Component({
  selector: 'app-evaluation-hr-detail',
  templateUrl: './evaluation-hr-detail.component.html',
  styleUrls: ['./evaluation-hr-detail.component.css']
})
export class EvaluationHrDetailComponent implements OnInit {
  evaluationFile: EvaluationFile;
  evaluationFileInstanceList: EvaluationFileInstance[];
  loading: boolean;
  userStatusList: UserStatus[];

  constructor(private route: ActivatedRoute, private hrService: HrService, private adminService: AdminService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.evaluationFile = data['evaluationFile'];
      this.getEvaluationFileInstances();
    });

    this.getUserStatus();
  }

  getEvaluationFileInstances() {
    this.loading = true;
    this.hrService.getEvaluationFileInstancesByEvaluationFileId(this.evaluationFile.id).subscribe(
      (result: EvaluationFileInstance[]) => {
        this.loading = false;
        this.evaluationFileInstanceList = result;
      },
      error => {
        this.loading = false;
        this.alertify.error(error);
      }
    );
  }

  getUserStatus() {
    if (localStorage.getItem('userStatusList')) {
      this.userStatusList = JSON.parse(localStorage.getItem('userStatusList'))
    } else {
      this.loading = true;
      this.adminService.getUserStatus().subscribe(
        (result: UserStatus[]) => {
          this.loading = false;
          this.userStatusList = result
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
    }
  }

  handleAction(users: User[]) {
    this.loading = true;
    this.hrService
      .generateEvaluationFile(this.evaluationFile.id, users)
      .subscribe(
        next => {
          this.loading = false;
          this.alertify.success('La fiche d\'évaluation a été générée avec succèes');
          this.getEvaluationFileInstances();
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }
}
