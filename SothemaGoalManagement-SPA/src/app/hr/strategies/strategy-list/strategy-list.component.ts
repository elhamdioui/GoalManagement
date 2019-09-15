import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { Strategy } from '../../../_models/strategy';
import { StatusTemplate } from '../../../_models/statusTemplate';
import { Pagination, PaginatedResult } from '../../../_models/pagination';
import { HrService } from '../../../_services/hr.service';
import { AuthService } from '../../../_services/auth.service';
import { AlertifyService } from '../../../_services/alertify.service';
import { StrategyEditModalComponent } from '../strategy-edit-modal/strategy-edit-modal.component';


@Component({
  selector: 'app-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.css']
})
export class StrategyListComponent implements OnInit {
  statusList: StatusTemplate[];
  strategies: Strategy[];
  strategyParams: any = {};
  pagination: Pagination;
  creationMode = false;
  bsModalRef: BsModalRef;

  constructor(
    private hrService: HrService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.strategies = data['strategies'].result;
      this.statusList = this.getStatusList();
      this.pagination = data['strategies'].pagination;
    });

    this.strategyParams.status = '';
    this.strategyParams.orderBy = 'created';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadStrategies();
  }

  resetFilters() {
    this.strategyParams.status = '';
    this.loadStrategies();
  }

  loadStrategies() {
    this.hrService
      .getStrategies(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.strategyParams
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

  creationToggle() {
    this.creationMode = true;
  }

  cancelCreationMode(creationMode: boolean) {
    this.creationMode = creationMode;
  }

  switchOffCreationMode(reload: boolean) {
    this.creationMode = false;
    if (reload) {
      this.loadStrategies();
    }
  }

  editStrategyModal(strategy: Strategy) {
    const initialState = {
      strategy,
      statusList: this.getStatusList()
    };

    this.bsModalRef = this.modalService.show(StrategyEditModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedStrategy.subscribe((updatedStrategy) => {
      this.hrService.updateStrategy(strategy.id, updatedStrategy).subscribe(() => {
        this.alertify.success('Stratégie été mise à jour.');
      }, error => {
        this.alertify.error(error);
      })

    });
  }

  private getStatusList(): StatusTemplate[]{
    return [{'key': 'DRAFT', 'value': 'Rédaction'}, 
            {'key': 'REVIEW', 'value': 'En Revue'}, 
            {'key': 'PUBLISHED', 'value': 'Publiée'}, 
            {'key': 'ACHIVED', 'value': 'Archivée'}]
  }
}
