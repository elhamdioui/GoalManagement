import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Strategy } from '../_models/strategy';

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.component.html',
  styles: ['./strategies.component.css']
})
export class StrategiesComponent implements OnInit {
  strategies: Strategy[];
  viewMode = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.strategies = data['strategies'];
    });
  }

  viewToggle() {
    this.viewMode = !this.viewMode;
  }
}
