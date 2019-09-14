import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { Axis } from './../../../_models/axis';
import { HrService } from '../../../_services/hr.service';
import { AlertifyService } from '../../../_services/alertify.service';
import { AuthService } from '../../../_services/auth.service';
import { AxisModalComponent } from '../axis-modal/axis-modal.component';

@Component({
  selector: 'app-strategy-axis',
  templateUrl: './strategy-axis.component.html',
  styleUrls: ['./strategy-axis.component.css']
})
export class StrategyAxisComponent implements OnInit {
  @Input() strategyId: number;
  axisList: Axis[];
  newAxis: any = {};
  bsModalRef: BsModalRef;

  constructor(private hrService: HrService, private authService: AuthService, private alertify: AlertifyService, private modalService: BsModalService) { }

  ngOnInit() {
    this.loadAxisList();
  }

  loadAxisList() {
    this.hrService.getAxisList(this.strategyId).subscribe(
      axises => {
        this.axisList = axises;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  addAxis() {
    this.newAxis.strategyId = this.strategyId;
    this.hrService
      .addAxis(this.newAxis)
      .subscribe(
        (axis: Axis) => {
          this.axisList.unshift(axis);
          this.newAxis.description = '';
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  deleteAxis(id: number) {
    this.alertify.confirm(
      'Etes-vous sur de vouloir supprimer cet axe?',
      () => {
        this.hrService
          .deleteAxis(id, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.axisList.splice(
                this.axisList.findIndex(a => a.id === id),
                1
              );
              this.alertify.success('L\'axe a été supprimé');
            },
            error => {
              this.alertify.error('Impossible de supprimer l\'axe');
            }
          );
      }
    );
  }

  editAxisModal(axis: Axis) {
    const initialState = {
      axis
    };

    this.bsModalRef = this.modalService.show(AxisModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedAxis.subscribe((updatedAxis) => {
      this.hrService.updateAxis(axis.id, updatedAxis).subscribe(() => {
        this.alertify.success('L\'axe été mis à jour.');
      }, error => {
        this.alertify.error(error);
      })

    });
  }
}
