import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';

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
  @ViewChild('adminTabs') adminTabs: TabsetComponent;
  departmentList: Department[];
  userStatusList: UserStatus[];
  users: User[];
  pagination: Pagination;
  public loading = false;
  creationMode = false;
  filters: any = {};
  isPhotosManagementSelected: boolean;

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
    this.loading = true;
    this.filters = filters;
    this.adminService
      .getUsersWithRoles(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.filters
      )
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
          this.loading = false;
        },
        error => {
          this.alertify.error(error);
          this.loading = false;
        }
      );
  }

  handleEditUserRoles(event: any) {
    this.loading = true;
    this.adminService.updateUserRoles(event.user, event.rolesToUpdate).subscribe(() => {
      this.alertify.success('Les rôles ont été mis à jour.');
      this.handleLoadUsers(event.filters);
      this.loading = false;
    }, error => {
      this.alertify.error(error);
      this.loading = false;
    })
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.handleLoadUsers(this.filters);
  }

  cancelRegisterMode(creationMode: boolean) {
    this.creationMode = creationMode;
  }

  switchOffRegisterMode(reload: boolean) {
    this.creationMode = false;
    if (reload) {
      this.handleLoadUsers
        (this.filters);
    }
  }

  handleCreationMode(event: boolean) {
    this.creationMode = event;
  }

  onSelect($event) {
    if (this.adminTabs.tabs[2].active) {
      this.isPhotosManagementSelected = true;
    } else {
      this.isPhotosManagementSelected = false;
    }
  }
}
