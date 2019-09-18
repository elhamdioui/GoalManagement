import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Strategy } from '../_models/strategy';

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.component.html',
  styleUrls: ['./strategies.component.css']
})
export class StrategiesComponent implements OnInit {
  strategies: Strategy[];
  axisPolesGroupedByAxis = {};
  keys: string[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.strategies = data['strategies'];

      this.strategies.forEach(strategy => {
        this.axisPolesGroupedByAxis = this.groupBy(strategy.axisPoles, 'axisDescription');
        this.keys = Object.keys(this.axisPolesGroupedByAxis);
        console.log('axisPolesGroupedByAxis:', this.axisPolesGroupedByAxis);
      });


    });
  }

  groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

}
