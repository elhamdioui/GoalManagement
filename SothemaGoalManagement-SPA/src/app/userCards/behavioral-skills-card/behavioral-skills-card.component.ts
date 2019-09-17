import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { Pagination, PaginatedResult } from '../../_models/pagination';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { SkillCard } from '../../_models/SkillCard';

@Component({
  selector: 'app-behavioral-skills-card',
  templateUrl: './behavioral-skills-card.component.html',
  styleUrls: ['./behavioral-skills-card.component.css']
})
export class BehavioralSkillsCardComponent implements OnInit {
  creationMode = false;
  bsModalRef: BsModalRef;
  pagination: Pagination;
  skillsCards: SkillCard[];

  constructor(private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.skillsCards = data['skillsCards'].result;
      this.pagination = data['skillsCards'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadSkillsCards();
  }

  loadSkillsCards() {

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
      this.loadSkillsCards();
    }
  }

}
