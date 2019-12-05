import { Component, OnInit, Input } from '@angular/core';

import { Axis } from './../../../_models/axis';
import { HrService } from '../../../_services/hr.service';
import { AlertifyService } from '../../../_services/alertify.service';
import { consumeBinding } from '@angular/core/src/render3/instructions';
import { AxisPole } from '../../../_models/axisPole';

@Component({
  selector: 'app-axis-poles-weights-list',
  templateUrl: './axis-poles-weights-list.component.html',
  styleUrls: ['./axis-poles-weights-list.component.css']
})
export class AxisPolesWeightsListComponent implements OnInit {
  @Input() axisList: Axis[];
  @Input() isReadOnly: boolean;
  tallyWeights: any;
  messages: string[] = [];
  axisPoles: AxisPole[] = [];

  constructor() { }

  ngOnInit() {

  }

  handleAxisPolesLoaded(axisPoles: AxisPole[]) {
    this.axisPoles = [...this.axisPoles, ...axisPoles];
    this.tallyWeights = this.axisPoles.reduce((tally, pole) => {
      if (tally[pole.poleName]) tally[pole.poleName] += pole.weight;
      else tally[pole.poleName] = pole.weight;
      return tally;
    }, {});

    for (let key in this.tallyWeights) {
      this.messages.push(`Pondération total du ${key} est ${this.tallyWeights[key]}%.`);
    }
  }
}
