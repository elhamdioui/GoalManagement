import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faSave, faEdit, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { EvaluationFileInstance } from '../../_models/evaluationFileInstance';
import { AxisInstance } from '../../_models/axisInstance';

@Component({
  selector: 'app-sheet-card',
  templateUrl: './sheet-card.component.html',
  styleUrls: ['./sheet-card.component.css']
})
export class SheetCardComponent implements OnInit {
  @Input() sheetToValidate: EvaluationFileInstance;
  @Output() updateUserWeightEvent = new EventEmitter<AxisInstance>();
  faSave = faSave;
  faEdit = faEdit;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  editing: boolean = false;
  isCollapsed = false;

  constructor() { }

  ngOnInit() {
  }

  toggleEdit(axisInstance: AxisInstance) {
    if (this.editing) {
      this.updateUserWeightEvent.emit(axisInstance);
    }
    this.editing = !this.editing;
  }
}
