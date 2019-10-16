import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../_models/user';
import { AdminService } from '../../_services/admin.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Evaluator } from '../../_models/evaluator';

@Component({
  selector: 'app-collaborator-search',
  templateUrl: './collaborator-search.component.html',
  styleUrls: ['./collaborator-search.component.css']
})
export class CollaboratorSearchComponent implements OnInit {
  @Input() actionLabel: string;
  @Output() actionEvent = new EventEmitter<User>();
  users: User[];
  searchTerm: string;
  loading = false;

  constructor(private adminService: AdminService,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }

  searchUsers() {
    this.loading = true;
    this.adminService.searchEvaluators(this.searchTerm).subscribe(users => {
      this.users = users;
      this.loading = false;
      if (this.users.length === 0) {
        this.alertify.error(`impossible de trouver un utilisateur avec le terme de recherche: ${this.searchTerm}`);
      }
      this.searchTerm = "";
    },
      error => {
        this.loading = false;
        this.alertify.error(error);
      }
    );
  }

  executeAction(user: User) {
    this.actionEvent.emit(user);
  }
}
