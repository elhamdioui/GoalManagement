import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Goal } from '../../_models/goal';

@Component({
  selector: 'app-historical-evaluation-modal',
  templateUrl: './historical-evaluation-modal.component.html',
  styleUrls: ['./historical-evaluation-modal.component.css']
})
export class HistoricalEvaluationModalComponent implements OnInit {
  goal: Goal;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
