import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

import { BehavioralSkill } from '../../../_models/behavioralSkill';

@Component({
  selector: 'app-behavioral-skill-detail',
  templateUrl: './behavioral-skill-detail.component.html',
  styleUrls: ['./behavioral-skill-detail.component.css']
})
export class BehavioralSkillDetailComponent implements OnInit {
  behavioralSkill: BehavioralSkill;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.behavioralSkill = data['behavioralSkill'];
    });
  }

}
