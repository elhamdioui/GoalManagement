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
  loading = false;

  constructor(private adminService: AdminService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadEvaluators();
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

  setAsEvaluator(user: User) {
    this.loading = true;
    this.adminService.addEvaluatorToUser(this.evaluated.id, user.id)
      .subscribe(
        () => {
          this.loading = false;
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
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }

  handleUpdateRankOfEvaluator(event: Evaluator) {
    this.loading = true;
    this.adminService.updateRankOfEvaluator(this.evaluated.id, event.id, event.rank)
      .subscribe(
        next => {
          this.loading = false;
          this.alertify.success('Mise à jour du rang réussie');
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }

  loadEvaluators() {
    this.loading = true;
    this.adminService.loadEvaluators(this.evaluated.id)
      .subscribe(
        (evaluators: Evaluator[]) => {
          this.loading = false;
          this.evaluators = evaluators;
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }

  handleDeleteEvaluator(event: Evaluator) {
    this.alertify.confirm(
      `Etes-vous sûr de vouloir supprimer l'evaluateur ${event.fullName}?`,
      () => {
        this.loading = true;
        this.adminService
          .deleteEvaluator(this.evaluated.id, event.id)
          .subscribe(
            () => {
              this.loading = false;
              this.loadEvaluators();
              this.alertify.success('L\'evaluateur a été supprimé.');
            },
            error => {
              this.loading = false;
              this.alertify.error('Échec de la suppression d\'evaluateur.');
            }
          );
      }
    );
  }
}
