import { Component, OnInit, Input } from '@angular/core';
import { faUser, faEdit, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../_models/user';

@Component({
  selector: 'app-collaborator-card',
  templateUrl: './collaborator-card.component.html',
  styleUrls: ['./collaborator-card.component.css']
})
export class CollaboratorCardComponent implements OnInit {
  @Input() user: User;
  faUser = faUser;
  faEdit = faEdit;
  faEnvelope = faEnvelope;

  constructor() { }

  ngOnInit() {
  }
}
