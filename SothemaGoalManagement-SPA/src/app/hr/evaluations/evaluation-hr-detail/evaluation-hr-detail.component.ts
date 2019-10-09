import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EvaluationFile } from '../../../_models/evaluationFile';

@Component({
  selector: 'app-evaluation-hr-detail',
  templateUrl: './evaluation-hr-detail.component.html',
  styleUrls: ['./evaluation-hr-detail.component.css']
})
export class EvaluationHrDetailComponent implements OnInit {
  evaluationFile: EvaluationFile;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.evaluationFile = data['evaluationFile'];
    });
  }

}
