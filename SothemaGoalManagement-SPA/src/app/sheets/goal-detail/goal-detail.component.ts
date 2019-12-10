import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalWithChildren } from '../../_models/goalWithChildren';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css']
})
export class GoalDetailComponent implements OnInit {
  goalWithChildren: GoalWithChildren;
  sheetId: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.goalWithChildren = data['goalDetail'];

      console.log('this.goalWithChildren:', this.goalWithChildren);
    });

    this.route.queryParams.subscribe(params => {
      this.sheetId = params['sheetId'];
    });
  }

  returnToList() {
    if (this.sheetId) {
      this.router.navigate([`/sheets/${this.sheetId}`]);
    } else {
      this.router.navigate([`/sheets`]);
    }
  }

}
