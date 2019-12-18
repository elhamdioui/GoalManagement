import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router } from '@angular/router';
import { GoalWithChildren } from '../../_models/goalWithChildren';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css']
})
export class GoalDetailComponent implements OnInit {
  goalWithChildren: GoalWithChildren;
  sheetId: number;
  faTrash = faTrash;
  public loading = false;
  showSubGoal: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.goalWithChildren = data['goalDetail'];
    });

    this.route.queryParams.subscribe(params => {
      this.sheetId = params['sheetId'];
    });
  }

  returnToList() {
    if (this.sheetId) {
      this.router.navigate([`/sheets/${this.sheetId}`]);
    } else {
      this.router.navigate(['/sheets']);
    }
  }

  deleteGoal(subGoal: GoalWithChildren) {
    this.alertify.confirm('Supprimer',
      `Êtes-vous sûr de vouloir supprimer le sous-objectif: ${subGoal.description}, assigné à ${subGoal.ownerFullName}?`,
      () => {
        this.loading = true;
        this.userService
          .deleteGoal(subGoal.id, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.loading = false;
              this.goalWithChildren.children.splice(
                this.goalWithChildren.children.findIndex(a => a.id === subGoal.id),
                1
              );
              this.alertify.success('Le sous-objectif a été supprimé');
            },
            error => {
              this.loading = false;
              this.alertify.error(error);
            }
          );
      }
    );
  }

  toggleSubGoal(subGoal: GoalWithChildren) {
    this.showSubGoal = !this.showSubGoal;
  }
}
