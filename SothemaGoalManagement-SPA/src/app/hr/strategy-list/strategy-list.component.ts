import { Component, OnInit } from '@angular/core';
import { Strategy } from '../../_models/strategy';
import { ActivatedRoute } from '@angular/router';

import { Pagination, PaginatedResult } from '../../_models/pagination';
import { HrService } from '../../_services/hr.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';


@Component({
  selector: 'app-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.css']
})
export class StrategyListComponent implements OnInit {
  statusList: string[];
  strategies: Strategy[];
  strategyParams: any = {};
  pagination: Pagination;
  registerMode = false;

  constructor(
    private hrService: HrService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.strategies = data['strategies'].result;
      this.statusList = ['Rédaction', 'En Revue', 'Publiée'];
      this.pagination = data['strategies'].pagination;
    });

    this.strategyParams.status = 'Rédaction';
    this.strategyParams.orderBy = 'created';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadStrategies();
  }

  resetFilters() {
    this.strategyParams.status = 'Rédaction';
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

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
