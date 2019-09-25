import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../_models/user';
import { HrService } from '../../_services/hr.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-collaborator-search',
  templateUrl: './collaborator-search.component.html',
  styleUrls: ['./collaborator-search.component.css']
})
export class CollaboratorSearchComponent implements OnInit {
  @Input() evaluated: User;
  users: User[];
  searchTerm: string;
  evaluators: User[];

  constructor(private hrService: HrService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadEvaluators();
  }

  searchUsers() {
    this.hrService.searchEvaluators(this.searchTerm).subscribe(users => {
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
    this.hrService.addEvaluatorToUser(this.evaluated.id, user.id)
      .subscribe(
        () => {
          this.evaluators.push(user);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  loadEvaluators() {
    this.hrService.loadEvaluators(this.evaluated.id)
      .subscribe(
        (evaluators: User[]) => {
          this.evaluators = evaluators;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  deleteEvaluator(evaluatedId: number, evaluator: User) {
    this.alertify.confirm(
      `Etes-vous sûr de vouloir supprimer l'evaluateur ${evaluator.firstName} ${evaluator.lastName}?`,
      () => {
        this.hrService
          .deleteEvaluator(evaluatedId, evaluator.id)
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
