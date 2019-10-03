import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { EvaluationFile } from './../../../_models/evaluationFile';
import { EvaluationHrEditModalComponent } from '../evaluation-hr-edit-modal/evaluation-hr-edit-modal.component';

@Component({
  selector: 'app-evaluation-hr-list',
  templateUrl: './evaluation-hr-list.component.html',
  styleUrls: ['./evaluation-hr-list.component.css']
})
export class EvaluationHrListComponent implements OnInit {
  @Input() statusList: string[];
  @Input() evaluationFiles: EvaluationFile[];
  @Output() loadEvaluationFilesEvent = new EventEmitter<any>();
  @Output() editEvaluationFileEvent = new EventEmitter<any>();
  filters: any = {};
  creationMode = false;
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.filters.status = '';
    this.filters.orderBy = 'created';
    this.loadEvaluationFilesEvent.emit(this.filters);
  }

  resetFilters() {
    this.filters.status = '';
    this.loadEvaluationFilesEvent.emit(this.filters);
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
      this.loadEvaluationFilesEvent.emit(this.filters);
    }
  }

  editEvaluationModal(evaluationFile: EvaluationFile) {
    const initialState = {
      evaluationFile,
      statusList: this.statusList
    };

    this.bsModalRef = this.modalService.show(EvaluationHrEditModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedEvaluationFile.subscribe((updatedEvaluationFile) => {
      let updateParams = { updatedEvaluationFile, filters: this.filters }
      this.editEvaluationFileEvent.emit(updateParams);
    });
  }
}
