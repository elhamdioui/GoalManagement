import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { BehavioralSkillInstance } from '../../_models/behavioralSkillInstance';

@Component({
  selector: 'app-behavioral-skill-evaluation',
  templateUrl: './behavioral-skill-evaluation.component.html',
  styleUrls: ['./behavioral-skill-evaluation.component.css']
})
export class BehavioralSkillEvaluationComponent implements OnInit {
  @Input() behavioralSkillInstanceList: BehavioralSkillInstance[];
  @Input() behavioralSkillIdToExpand: number;
  @Input() sheetId: number;
  @Output() addBehavioralSkillEvaluationEvent = new EventEmitter<any>();
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

  addEvaluation() {

  }
}
