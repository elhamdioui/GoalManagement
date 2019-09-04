import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../../_models/user';
import { AdminService } from '../../_services/admin.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Pagination, PaginatedResult } from './../../_models/pagination';
import { UserStatus } from '../../_models/userStatus';
import { Department } from './../../_models/department';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.css']
})
export class CollaboratorListComponent implements OnInit {
  departmentList: Department[];
  userStatusList: UserStatus[];
  users: User[];
  userParams: any = {};
  pagination: Pagination;
  registerMode = false;

  constructor(
    private adminService: AdminService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData = data['resolvedData'];
      this.users = resolvedData['users'].result;
      this.departmentList = resolvedData['departmentList'];
      this.userStatusList = resolvedData['userStatusList'];
      this.pagination = resolvedData['users'].pagination;
    });

    this.userParams.departmentId = 0;
    this.userParams.userStatusId = 0;
    this.userParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.departmentId = 0;
    this.userParams.userStatusId = 0;
    this.loadUsers();
  }

  loadUsers() {
    this.adminService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
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

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  // createUserModal() {
  //   const initialState = {
  //     departmentList: this.departmentList,
  //     userStatusList: this.userStatusList
  //   };

  //   this.bsModalRef = this.modalService.show(NewUserModalComponent, { initialState });
  //   this.bsModalRef.content.createNewUser.subscribe((newUser) => {
  //     console.log("New user: ", newUser);
  //     this.adminService.createUser(newUser).subscribe(() => {
  //       this.loadUsers();
  //     }, error => {
  //       this.alertify.error(error);
  //     })
  //   });
  // }

}
