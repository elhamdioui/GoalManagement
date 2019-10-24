import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { EvaluationFile } from '../../../_models/evaluationFile';
import { EvaluationFileInstance } from '../../../_models/evaluationFileInstance';
import { User } from '../../../_models/user';
import { HrService } from '../../../_services/hr.service';
import { AuthService } from '../../../_services/auth.service';
import { AlertifyService } from '../../../_services/alertify.service';
import { UserStatus } from '../../../_models/userStatus';
import { AdminService } from '../../../_services/admin.service';
import { CollaboratorSearchComponent } from '../../../collaborators/collaborator-search/collaborator-search.component';

@Component({
  selector: 'app-evaluation-hr-detail',
  templateUrl: './evaluation-hr-detail.component.html',
  styleUrls: ['./evaluation-hr-detail.component.css']
})
export class EvaluationHrDetailComponent implements OnInit {
  evaluationFile: EvaluationFile;
  evaluationFileInstanceList: EvaluationFileInstance[] = [];
  loading: boolean;
  userStatusList: UserStatus[];
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private route: ActivatedRoute, private hrService: HrService, private adminService: AdminService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.hrService.efiObservableList.subscribe(
      efiList => {
        (this.evaluationFileInstanceList = efiList)
      }
    );
    this.route.data.subscribe(data => {
      this.evaluationFile = data['evaluationFile'];
      this.hrService.getEvaluationFileInstancesByEvaluationFileId(this.evaluationFile.id).subscribe();
    });

    this.getUserStatus();
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

  handleDeleteEvaluationFileInstance(evaluationFileInstanceId) {
    this.alertify.confirm(
      'Etes-vous sur de vouloir supprimer cette Fiche d\'évaluation?',
      () => {
        this.loading = true;
        this.hrService
          .deleteEvaluationFileInstance(evaluationFileInstanceId, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.loading = false;
              // this.evaluationFileInstanceList.splice(
              //   this.evaluationFileInstanceList.findIndex(a => a.id === evaluationFileInstanceId),
              //   1
              // );
              this.evaluationFileInstanceList = [];
              this.hrService.getEvaluationFileInstancesByEvaluationFileId(this.evaluationFile.id).subscribe();
              this.alertify.success('La fiche d\'évaluation a été supprimée');
            },
            error => {
              this.loading = false;
              this.alertify.error('Impossible de supprimer la diche d\'évaluation');
            }
          );
      }
    );
  }

  openModal() {
    const initialState = {
      userStatusList: this.userStatusList,
      actionLabel: 'Générer une fiche d\'évaluation'
    };
    this.bsModalRef = this.modalService.show(CollaboratorSearchComponent, { initialState, class: 'modal-lg' });
    this.bsModalRef.content.actionEvent.subscribe((users) => {
      this.loading = true;
      this.hrService
        .generateEvaluationFile(this.evaluationFile.id, users)
        .subscribe(
          next => {
            this.loading = false;
            this.alertify.success('La fiche d\'évaluation a été générée avec succèes');
            this.evaluationFileInstanceList = [];
            this.hrService.getEvaluationFileInstancesByEvaluationFileId(this.evaluationFile.id).subscribe();
          },
          error => {
            this.loading = false;
            this.alertify.error(error);
          }
        );
    });
  }
}
