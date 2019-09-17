import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { Pagination, PaginatedResult } from '../../_models/pagination';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { GoalCard } from '../../_models/GoalCard';

@Component({
  selector: 'app-goal-card-list',
  templateUrl: './goal-card-list.component.html',
  styleUrls: ['./goal-card-list.component.css']
})
export class GoalCardListComponent implements OnInit {
  creationMode = false;
  bsModalRef: BsModalRef;
  pagination: Pagination;
  goalsCards: GoalCard[];

  constructor(private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.goalsCards = data['goalsCards'].result;
      this.pagination = data['goalsCards'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadGoalsCards();
  }

  loadGoalsCards() {

  }

  creationToggle() {
    this.creationMode = true;
  }

  cancelCreationMode(creationMode: boolean) {
    this.creationMode = creationMode;
  }

  switchOffCreationMode(reload: boolean) {
    this.creationMode = false;
    if (reload) {
      this.loadGoalsCards();
    }
  }

}
