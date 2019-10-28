import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Pagination, PaginatedResult } from '../../_models/pagination';
import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';

@Component({
  selector: 'app-sheets-panel',
  templateUrl: './sheets-panel.component.html',
  styleUrls: ['./sheets-panel.component.css']
})
export class SheetsPanelComponent implements OnInit {
  pagination: Pagination;
  sheets: EvaluationFileInstance[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sheets = data['sheets'].result;
      this.pagination = data['sheets'].pagination;
    });
  }

}
