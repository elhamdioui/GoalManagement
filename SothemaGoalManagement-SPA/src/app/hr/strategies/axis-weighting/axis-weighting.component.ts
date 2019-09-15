import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-axis-weighting',
  templateUrl: './axis-weighting.component.html',
  styleUrls: ['./axis-weighting.component.css']
})
export class AxisWeightingComponent implements OnInit {
  editing: boolean = false;
  axisPoleWeight: any = { weight: 40 };
  constructor() { }

  ngOnInit() {
  }

  onWeightChange(value: number) {
    this.axisPoleWeight.weight = value;
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

}
