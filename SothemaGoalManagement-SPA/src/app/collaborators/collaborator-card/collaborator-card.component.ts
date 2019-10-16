import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';

@Component({
  selector: 'app-collaborator-card',
  templateUrl: './collaborator-card.component.html',
  styleUrls: ['./collaborator-card.component.css']
})
export class CollaboratorCardComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
    console.log('user:', this.user);
  }
}
