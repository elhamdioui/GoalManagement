import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { User } from '../../_models/user';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';
import { Pagination, PaginatedResult } from './../../_models/pagination';
import { UserStatus } from '../../_models/userStatus';
import { Department } from '../../_models/department';

@Component({
  selector: 'app-user-roles-management',
  templateUrl: './user-roles-management.component.html',
  styleUrls: ['./user-roles-management.component.css']
})
export class UserRolesManagementComponent implements OnInit {
  @Input() users: User[];
  @Input() pagination: Pagination;
  @Input() departmentList: Department[];
  @Input() userStatusList: UserStatus[];
  @Output() loadUsersWithRolesEvent = new EventEmitter<any>();
  @Output() pageChangedEvent = new EventEmitter<any>();
  @Output() editUserRoleEvent = new EventEmitter<any>();
  creationMode = false;
  filters: any = {};
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.loadUsersWithRolesEvent.emit(this.filters);
  }

  pageChanged(event: any): void {
    let pageParams = { currentPage: event.page, filters: this.filters }
    this.pageChangedEvent.emit(pageParams);;
  }

  cancelRegisterMode(creationMode: boolean) {
    this.creationMode = creationMode;
  }

  switchOffRegisterMode(reload: boolean) {
    this.creationMode = false;
    if (reload) {
      this.loadUsersWithRolesEvent.emit(this.filters);
    }
  }

  handleLoadUsers(event: any) {
    this.filters = event;
    this.loadUsersWithRolesEvent.emit(this.filters);
  }

  handleCreationMode(event: boolean) {
    this.creationMode = event;
  }

  editRolesModal(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
      const rolesToUpdate = {
        roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate) {
        let updateParams = { user, rolesToUpdate, filters: this.filters }
        this.editUserRoleEvent.emit(updateParams);
      }
    });
  }

  private getRolesArray(user) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: 'Admin', value: 'Admin' },
      { name: 'HR', value: 'HR', },
      { name: 'Collaborator', value: 'Collaborator' },
      { name: 'HRD', value: 'HRD' }
    ];

    for (let i = 0; i < availableRoles.length; i++) {
      let isMatch = false;
      for (let j = 0; j < userRoles.length; j++) {
        if (availableRoles[i].name === userRoles[j]) {
          isMatch = true;
          availableRoles[i].checked = true;
          roles.push(availableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        availableRoles[i].checked = false;
        roles.push(availableRoles[i]);
      }
    }
    return roles;
  }

}
