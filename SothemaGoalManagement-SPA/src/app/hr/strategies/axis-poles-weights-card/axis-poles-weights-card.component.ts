import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { HrService } from '../../../_services/hr.service';
import { AlertifyService } from '../../../_services/alertify.service';
import { AxisPole } from './../../../_models/axisPole';
import { Axis } from '../../../_models/axis';


@Component({
  selector: 'app-axis-poles-weights-card',
  templateUrl: './axis-poles-weights-card.component.html',
  styleUrls: ['./axis-poles-weights-card.component.css']
})
export class AxisPolesWeightsCardComponent implements OnInit {
  @Input() axis: Axis;
  @Input() isReadOnly: boolean;
  @Output() axisPolesLoadedEvent = new EventEmitter<AxisPole[]>();
  axisPoleList: AxisPole[];
  public loading = false;
  isCollapsed: boolean = false;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  constructor(private hrService: HrService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadAxisPoles();
  }

  loadAxisPoles() {
    this.loading = true;
    this.hrService.getAxisPoleList(this.axis.id).subscribe(
      result => {
        this.loading = false;
        this.axisPoleList = result;
        this.axisPolesLoadedEvent.emit(this.axisPoleList);
      },
      error => {
        this.loading = false;
        this.alertify.error(error);
      }
    );
  }

  handleUpdateAxisPole(axisPole: AxisPole) {
    this.loading = true;
    this.hrService
      .updateAxisPoleWeigth(axisPole.axisId, axisPole.poleId, axisPole.weight)
      .subscribe(
        next => {
          this.loading = false;
          this.alertify.success('Mise à jour du pondération réussie');
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        }
      );
  }
}
