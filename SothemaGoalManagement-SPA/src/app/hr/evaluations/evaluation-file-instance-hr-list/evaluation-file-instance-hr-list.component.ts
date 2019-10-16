import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EvaluationFileInstance } from '../../../_models/evaluationFileInstance';
import { User } from '../../../_models/user';

@Component({
  selector: 'app-evaluation-file-instance-hr-list',
  templateUrl: './evaluation-file-instance-hr-list.component.html',
  styleUrls: ['./evaluation-file-instance-hr-list.component.css']
})
export class EvaluationFileInstanceHrListComponent implements OnInit {
  @Input() evaluationFileInstanceList: EvaluationFileInstance[];
  @Output() actionEvent = new EventEmitter<User>();
  filteredEvaluationFileInstances: EvaluationFileInstance[];
  values: string = '';

  constructor() { }

  ngOnInit() {
    //this.actionLabel = 'Générer une fiche d\'évaluation';
    this.filteredEvaluationFileInstances = this.evaluationFileInstanceList;
  }

  onKeyUp(event) {
    this.values = event.target.value;
    this.filteredEvaluationFileInstances = this.evaluationFileInstanceList.filter(efi => efi.ownerName.toLowerCase().includes(this.values.toLowerCase()));
  }

  handleAction(user: User) {
    this.actionEvent.emit(user);
  }
}
