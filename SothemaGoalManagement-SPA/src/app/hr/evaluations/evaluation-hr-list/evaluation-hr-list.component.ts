import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { Evaluation } from './../../../_models/evaluation';
import { EvaluationHrEditModalComponent } from '../evaluation-hr-edit-modal/evaluation-hr-edit-modal.component';

@Component({
  selector: 'app-evaluation-hr-list',
  templateUrl: './evaluation-hr-list.component.html',
  styleUrls: ['./evaluation-hr-list.component.css']
})
export class EvaluationHrListComponent implements OnInit {
  @Input() statusList: string[];
  @Input() evaluations: Evaluation[];
  @Output() loadEvaluationsEvent = new EventEmitter<any>();
  @Output() editEvaluationEvent = new EventEmitter<any>();
  filters: any = {};
  creationMode = false;
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.filters.status = '';
    this.filters.orderBy = 'created';
    this.loadEvaluationsEvent.emit(this.filters);
  }

  resetFilters() {
    this.filters.status = '';
    this.loadEvaluationsEvent.emit(this.filters);
  }

  creationToggle() {
    this.creationMode = true;
  }

  cancelCreationMode(creationMode: boolean) {
    this.creationMode = creationMode;
  }

  switchOffCreationMode(reload: boolean) {
    this.creationMode = false;
    if (reload) {
      this.loadEvaluationsEvent.emit(this.filters);
    }
  }

  editBehavioralSkillModal(behavioralSkill: Evaluation) {
    const initialState = {
      behavioralSkill,
      statusList: this.statusList
    };

    this.bsModalRef = this.modalService.show(EvaluationHrEditModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedBehavioralSkill.subscribe((updatedBehavioralSkill) => {
      let updateParams = { updatedBehavioralSkill, filters: this.filters }
      this.editEvaluationEvent.emit(updateParams);
    });
  }
}
