import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { Pagination } from '../../../_models/pagination';
import { Strategy } from '../../../_models/strategy';
import { StrategyEditModalComponent } from '../strategy-edit-modal/strategy-edit-modal.component';


@Component({
  selector: 'app-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.css']
})
export class StrategyListComponent implements OnInit {
  @Input() statusList: string[];
  @Input() strategies: Strategy[];
  @Input() pagination: Pagination
  @Output() loadStrategiesEvent = new EventEmitter<any>();
  @Output() editStrategyEvent = new EventEmitter<any>();
  @Output() pageChangedEvent = new EventEmitter<any>();
  filters: any = {};
  creationMode = false;
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.filters.status = '';
    this.filters.orderBy = 'created';
  }

  pageChanged(event: any): void {
    let pageParams = { currentPage: event.page, filters: this.filters }
    this.pageChangedEvent.emit(pageParams);;
  }

  resetFilters() {
    this.filters.status = '';
    this.loadStrategiesEvent.emit(this.filters);
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
      this.loadStrategiesEvent.emit(this.filters);
    }
  }

  editStrategyModal(strategy: Strategy) {
    const initialState = {
      strategy,
      statusList: this.statusList
    };

    this.bsModalRef = this.modalService.show(StrategyEditModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedStrategy.subscribe((updatedStrategy) => {
      let updateParams = { updatedStrategy, filters: this.filters }
      this.editStrategyEvent.emit(updateParams);
    });
  }
}
