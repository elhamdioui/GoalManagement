import { Component, OnInit, Input } from '@angular/core';
import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';

@Component({
  selector: 'app-sheet-meta-data',
  templateUrl: './sheet-meta-data.component.html',
  styleUrls: ['./sheet-meta-data.component.css']
})
export class SheetMetaDataComponent implements OnInit {
  @Input() show: boolean;
  @Input() sheet: EvaluationFileInstance;

  constructor() { }

  ngOnInit() {
  }

}
