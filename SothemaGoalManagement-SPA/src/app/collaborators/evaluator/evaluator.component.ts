import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Evaluator } from '../../_models/evaluator';

@Component({
  selector: 'app-evaluator',
  templateUrl: './evaluator.component.html',
  styleUrls: ['./evaluator.component.css']
})
export class EvaluatorComponent implements OnInit {
  @Input() evaluator: Evaluator;
  @Output() updateRankOfEvaluatorEvent = new EventEmitter<Evaluator>()
  @Output() deleteEvaluatorEvent = new EventEmitter<Evaluator>()
  editing: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onRankChange(value: number) {
    this.evaluator.rank = value;
  }

  toggleEdit() {
    if (this.editing) {
      this.updateRankOfEvaluatorEvent.emit(this.evaluator);
    }
    this.editing = !this.editing;
  }

  deleteEvaluator() {
    this.deleteEvaluatorEvent.emit(this.evaluator);
  }
}
