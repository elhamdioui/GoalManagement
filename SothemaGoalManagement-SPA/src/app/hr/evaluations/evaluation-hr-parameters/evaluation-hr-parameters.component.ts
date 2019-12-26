import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-evaluation-hr-parameters',
  templateUrl: './evaluation-hr-parameters.component.html',
  styleUrls: ['./evaluation-hr-parameters.component.css']
})
export class EvaluationHrParametersComponent implements OnInit {
  public loading = false;
  evaluationParameters: any[] = [];
  bsConfig: Partial<BsDatepickerConfig>;
  faTrash = faTrash;

  constructor() { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'YYYY-MM-DD'
    };
  }

  addDateRange() {
    this.evaluationParameters.push({ event: (<HTMLInputElement>document.querySelector("#event")).value, datesRange: (<HTMLInputElement>document.querySelector("#datesRange")).value });
  }

  deleteEvaluationParam(idx: number) {

    this.evaluationParameters.splice(idx, 1);
  }
}
