import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Pagination } from '../../_models/pagination';
import { User } from '../../_models/user';
import { UserStatus } from '../../_models/userStatus';
import { Department } from '../../_models/department';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.css']
})
export class CollaboratorListComponent implements OnInit {
  @Input() users: User[];
  @Input() pagination: Pagination;
  @Input() departmentList: Department[];
  @Input() userStatusList: UserStatus[];
  @Output() loadUsersEvent = new EventEmitter<any>();
  @Output() pageChangedEvent = new EventEmitter<any>();
  creationMode = false;
  filters: any = {};

  constructor(
  ) { }

  ngOnInit() {

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
      this.loadUsersEvent.emit(this.filters);
    }
  }

  handleLoadUsers(event: any) {
    this.filters = event;
    this.loadUsersEvent.emit(this.filters);
  }

  handleCreationMode(event: boolean) {
    this.creationMode = event;
  }

}
