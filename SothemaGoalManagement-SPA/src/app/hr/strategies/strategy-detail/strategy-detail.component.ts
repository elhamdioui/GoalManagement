import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

import { Strategy } from '../../../_models/strategy';

@Component({
  selector: 'app-strategy-detail',
  templateUrl: './strategy-detail.component.html',
  styleUrls: ['./strategy-detail.component.css']
})
export class StrategyDetailComponent implements OnInit {
  strategy: Strategy;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.strategy = data['strategy'];
    });
  }

}
