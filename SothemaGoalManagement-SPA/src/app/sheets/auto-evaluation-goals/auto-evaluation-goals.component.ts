import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Goal } from '../../_models/goal';

@Component({
  selector: 'app-auto-evaluation-goals',
  templateUrl: './auto-evaluation-goals.component.html',
  styleUrls: ['./auto-evaluation-goals.component.css']
})
export class AutoEvaluationGoalsComponent implements OnInit {
  @Input() goal: Goal;
  @Output() calculateAxisGradeEvent = new EventEmitter<Goal>();
  constructor() { }

  ngOnInit() {
  }

  onBlur() {
    this.calculateAxisGradeEvent.emit(this.goal);
  }
}
