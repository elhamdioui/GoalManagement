import { Component, OnInit, Input } from '@angular/core';
import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';

@Component({
  selector: 'app-auto-evaluation',
  templateUrl: './auto-evaluation.component.html',
  styleUrls: ['./auto-evaluation.component.css']
})
export class AutoEvaluationComponent implements OnInit {
  @Input() goalsByAxisInstanceList: GoalByAxisInstance[];
  constructor() { }

  ngOnInit() {

  }
}
