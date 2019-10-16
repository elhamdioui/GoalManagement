import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EvaluationFile } from '../../../_models/evaluationFile';
import { EvaluationFileInstance } from '../../../_models/evaluationFileInstance';
import { User } from '../../../_models/user';
import { HrService } from '../../../_services/hr.service';
import { AuthService } from '../../../_services/auth.service';
import { AlertifyService } from '../../../_services/alertify.service';

@Component({
  selector: 'app-evaluation-hr-detail',
  templateUrl: './evaluation-hr-detail.component.html',
  styleUrls: ['./evaluation-hr-detail.component.css']
})
export class EvaluationHrDetailComponent implements OnInit {
  evaluationFile: EvaluationFile;
  evaluationFileInstanceList: EvaluationFileInstance[];
  loading: boolean;

  constructor(private route: ActivatedRoute, private hrService: HrService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData = data['resolvedData'];
      this.evaluationFile = resolvedData['evaluationFile'];
      this.evaluationFileInstanceList = resolvedData['evaluationFileInstanceList'];
    });
  }

  handleAction(user: User) {
    this.loading = true;
    this.hrService
      .generateEvaluationFile(user.id, this.evaluationFile.id)
      .subscribe(
        next => {
          this.loading = false;
          this.alertify.success('La fiche d\'évaluation a été générée avec succèes');
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }
}
