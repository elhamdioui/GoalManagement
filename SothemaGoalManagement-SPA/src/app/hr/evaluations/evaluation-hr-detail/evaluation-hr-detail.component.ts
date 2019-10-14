import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EvaluationFile } from '../../../_models/evaluationFile';
import { EvaluationFileInstance } from '../../../_models/evaluationFileInstance';
import { AxisInstance } from '../../../_models/axisInstance';
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

  handleUpdateUserWeight(axisInstance: AxisInstance) {
    this.loading = true;
    this.hrService
      .updateAxisInstance(this.authService.decodedToken.nameid, axisInstance.id, axisInstance.userWeight)
      .subscribe(
        next => {
          this.loading = false;
          this.alertify.success('Mise à jour du pondération réussie');
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }
}
