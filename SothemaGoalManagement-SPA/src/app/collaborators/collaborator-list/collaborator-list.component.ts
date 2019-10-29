import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../_models/user';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.css']
})
export class CollaboratorListComponent implements OnInit {
  @Input() users: User[];
  @Output() loadUsersEvent = new EventEmitter<any>();
  @Output() pageChangedEvent = new EventEmitter<number>();

  constructor(
  ) { }

  ngOnInit() { }

  handleLoadUsers(event: any) {
    this.loadUsersEvent.emit(event);
  }
}
