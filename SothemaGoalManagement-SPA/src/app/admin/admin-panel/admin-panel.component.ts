import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AdminService } from '../../_services/admin.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Pagination, PaginatedResult } from './../../_models/pagination';
import { UserStatus } from '../../_models/userStatus';
import { Department } from './../../_models/department';
import { User } from '../../_models/user';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  departmentList: Department[];
  userStatusList: UserStatus[];
  users: User[];
  pagination: Pagination;

  constructor(private route: ActivatedRoute, private adminService: AdminService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData = data['resolvedData'];
      this.users = resolvedData['users'].result;
      this.departmentList = resolvedData['departmentList'];
      this.userStatusList = resolvedData['userStatusList'];
      this.pagination = resolvedData['users'].pagination;
    });
  }

  handleLoadUsers(filters) {
    this.adminService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        filters
      )
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  handlePageChanged(event: any): void {
    this.pagination.currentPage = event.currentPage;
    this.handleLoadUsers(event.filters);;
  }
}
