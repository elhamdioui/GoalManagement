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
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.strategies = data['strategies'];

      console.log('this.strategies: ', this.strategies);
    });
  }

}
