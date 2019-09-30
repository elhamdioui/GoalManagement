import { Component, OnInit, Input } from '@angular/core';

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
  @Input() evaluated: User;
  users: User[];
  searchTerm: string;
  evaluators: Evaluator[];

  constructor(private adminService: AdminService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadEvaluators();
  }

  searchUsers() {
    this.adminService.searchEvaluators(this.searchTerm).subscribe(users => {
      this.users = users;
      if (this.users.length === 0) {
        this.alertify.error(`impossible de trouver un utilisateur avec le terme de recherche: ${this.searchTerm}`);
      }
      this.searchTerm = "";
    },
      error => {
        this.alertify.error(error);
      }
    );
  }

  setAsEvaluator(user: User) {
    this.adminService.addEvaluatorToUser(this.evaluated.id, user.id)
      .subscribe(
        () => {
          let evaluator: Evaluator = {
            id: user.id,
            fullName: user.firstName + ' ' + user.lastName,
            rank: 1,
            departmentName: user.department.name,
            title: user.title
          };
          this.evaluators.push(evaluator);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  handleUpdateRankOfEvaluator(event: Evaluator) {
    this.adminService.updateRankOfEvaluator(this.evaluated.id, event.id, event.rank)
      .subscribe(
        next => {
          this.alertify.success('Mise à jour du rang réussie');
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  loadEvaluators() {
    this.adminService.loadEvaluators(this.evaluated.id)
      .subscribe(
        (evaluators: Evaluator[]) => {
          this.evaluators = evaluators;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  handleDeleteEvaluator(event: Evaluator) {
    this.alertify.confirm(
      `Etes-vous sûr de vouloir supprimer l'evaluateur ${event.fullName}?`,
      () => {
        this.adminService
          .deleteEvaluator(this.evaluated.id, event.id)
          .subscribe(
            () => {
              this.loadEvaluators();
              this.alertify.success('L\'evaluateur a été supprimé.');
            },
            error => {
              this.alertify.error('Échec de la suppression d\'evaluateur.');
            }
          );
      }
    );
  }
}
