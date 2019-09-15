import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-axis-poles-weights-card',
  templateUrl: './axis-poles-weights-card.component.html',
  styleUrls: ['./axis-poles-weights-card.component.css']
})
export class AxisPolesWeightsCardComponent implements OnInit {
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
