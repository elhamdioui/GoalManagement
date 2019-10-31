import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { AxisInstance } from '../../_models/axisInstance';
import { Goal } from '../../_models/goal';
import { GoalType } from '../../_models/goalType';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  @Input() axisInstances: AxisInstance[];
  @Input() goalList: Goal[];
  @Input() goalTypeList: GoalType[];
  @Output() addGoalEvent = new EventEmitter<Goal>();
  isCollapsed = true;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

}
