import { Component, OnInit, Input } from '@angular/core';
import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';

@Component({
  selector: 'app-my-collaborators-sheets',
  templateUrl: './my-collaborators-sheets.component.html',
  styleUrls: ['./my-collaborators-sheets.component.css']
})
export class MyCollaboratorsSheetsComponent implements OnInit {
  @Input() sheetsToValidate: EvaluationFileInstance[];
  constructor() { }

  ngOnInit() {
  }

}
