import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { User } from '../../_models/user';
import { AdminService } from '../../_services/admin.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Pagination, PaginatedResult } from './../../_models/pagination';
import { NewUserModalComponent } from './../new-user-modal/new-user-modal.component';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.css']
})
export class CollaboratorListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  departmentList = [];
  userParams: any = {};
  pagination: Pagination;
  bsModalRef: BsModalRef;

  constructor(
    private adminService: AdminService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.departmentId = 0;
    this.userParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.departmentId = 0;
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

  createUserModal() {
    this.bsModalRef = this.modalService.show(NewUserModalComponent, {});
    this.bsModalRef.content.createNewUser.subscribe((newUser) => {
      console.log("New user: ", newUser);
      this.adminService.createUser(newUser).subscribe(() => {
        this.loadUsers();
      }, error => {
        this.alertify.error(error);
      })

    });
  }
}
