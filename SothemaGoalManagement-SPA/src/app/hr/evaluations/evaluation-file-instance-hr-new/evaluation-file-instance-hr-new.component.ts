import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../../_models/user';
import { UserStatus } from '../../../_models/userStatus';

@Component({
  selector: 'app-evaluation-file-instance-hr-new',
  templateUrl: './evaluation-file-instance-hr-new.component.html',
  styleUrls: ['./evaluation-file-instance-hr-new.component.css']
})
export class EvaluationFileInstanceHrNewComponent implements OnInit {
  @Input() userStatusList: UserStatus[];
  @Output() actionEvent = new EventEmitter<User>();
  actionLabel: string;

  constructor() { }

  ngOnInit() {
    this.actionLabel = 'Générer une fiche d\'évaluation';
  }

  handleAction(user: User) {
    this.actionEvent.emit(user);
  }
}
