import { Component, OnInit, Input } from '@angular/core';
import { AxisInstance } from '../../_models/axisInstance';

@Component({
  selector: 'app-axis-user',
  templateUrl: './axis-user.component.html',
  styleUrls: ['./axis-user.component.css']
})
export class AxisUserComponent implements OnInit {
  @Input() strategyTitle: string;
  @Input() strategyDescription: string;
  @Input() axisInstances: AxisInstance[];


  constructor() { }

  ngOnInit() {
  }

}
