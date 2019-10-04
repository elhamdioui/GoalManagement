import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';

import { Strategy } from '../../_models/strategy';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { HrService } from '../../_services/hr.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { BehavioralSkill } from '../../_models/behavioralSkill';
import { EvaluationFile } from '../../_models/evaluationFile';

@Component({
  selector: 'app-hr-panel',
  templateUrl: './hr-panel.component.html',
  styleUrls: ['./hr-panel.component.css']
})
export class HrPanelComponent implements OnInit {
  @ViewChild('hrTabs') hrTabs: TabsetComponent;
  statusList: string[];
  strategies: Strategy[];
  behavioralSkills: BehavioralSkill[];
  evaluationFiles: EvaluationFile[];
  pagination: Pagination;

  constructor(private route: ActivatedRoute, private hrService: HrService,
    private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.strategies = data['strategies'].result;
      this.pagination = data['strategies'].pagination;
    });

    this.statusList = ['Rédaction', 'En Revue', 'Publiée', 'Archivée'];

    //https://hackernoon.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
    Promise.resolve(null).then(() => {
      this.route.queryParams.subscribe(params => {
        const selectedTab = params['tab'] || 0;
        this.hrTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
      });
    });
  }

  handleLoadStrategies(filters) {
    this.hrService
      .getStrategies(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        filters
      )
      .subscribe(
        (res: PaginatedResult<Strategy[]>) => {
          this.strategies = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  handleEditStrategy(event: any) {
    this.hrService.updateStrategy(this.authService.decodedToken.nameid, event.updatedStrategy).subscribe(() => {
      this.alertify.success('Stratégie a été mise à jour.');
      this.handleLoadStrategies(event.filters);
    }, error => {
      this.handleLoadStrategies(event.filters);
      this.alertify.error(error);
    })
  }

  handleLoadBehavioralSkills(filters) {
    this.hrService
      .getBehavioralSkills(this.authService.decodedToken.nameid, filters)
      .subscribe(
        (res: BehavioralSkill[]) => {
          this.behavioralSkills = res;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  handleEditBehavioralSkill(event: any) {
    this.hrService.updateBehavioralSkill(this.authService.decodedToken.nameid, event.updatedBehavioralSkill).subscribe(() => {
      this.alertify.success('Compétence comportementale a été mise à jour.');
      this.handleLoadBehavioralSkills(event.filters);
    }, error => {
      this.handleLoadBehavioralSkills(event.filters);
      this.alertify.error(error);
    })
  }

  handleLoadEvaluationFiles(filters) {
    this.hrService
      .getEvaluations(this.authService.decodedToken.nameid, filters)
      .subscribe(
        (res: EvaluationFile[]) => {
          this.evaluationFiles = res;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  handleEditEvaluationFile(event: any) {
    this.hrService.updateEvaluation(this.authService.decodedToken.nameid, event.updatedEvaluation).subscribe(() => {
      this.alertify.success('Fiche d\'évaluation a été mis à jour.');
      this.handleLoadEvaluationFiles(event.filters);
    }, error => {
      this.handleLoadEvaluationFiles(event.filters);
      this.alertify.error(error);
    })
  }

  handlePageChanged(event: any): void {
    this.pagination.currentPage = event.currentPage;
    this.handleLoadStrategies(event.filters);;
  }
}
