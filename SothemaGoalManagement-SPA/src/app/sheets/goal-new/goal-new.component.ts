import { FileUploader } from 'ng2-file-upload';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AxisInstance } from '../../_models/axisInstance';
import { Goal } from '../../_models/goal';
import { GoalType } from '../../_models/goalType';
import { GoalByAxisInstance } from '../../_models/goalsByAxisInstance';
import { Project } from '../../_models/project';

@Component({
  selector: 'app-goal-new',
  templateUrl: './goal-new.component.html',
  styleUrls: ['./goal-new.component.css']
})
export class GoalNewComponent implements OnInit {
  @Input() axisInstances: AxisInstance[];
  @Input() goalTypeList: GoalType[];
  @Input() projectList: Project[];
  @Input() goalsByAxisInstanceList: GoalByAxisInstance[];
  @Output() createGoalEvent = new EventEmitter<any>();
  @Output() loadProjectsEvent = new EventEmitter<number>();
  newGoal: any = {};
  showError: boolean = false;
  filteredProjects: Project[] = [];

  constructor() { }

  ngOnInit() {
    this.newGoal.goalTypeId = this.goalTypeList[0].id;
    this.newGoal.axisInstanceId = this.axisInstances[0].id;
  }

  createGoal() {
    if (this.isTotalWeightValid()) {
      if (this.newGoal.goalTypeId < 3) {
        this.newGoal.projectName = '';
      }

      this.createGoalEvent.emit(this.newGoal);
      this.newGoal.description = '';
      this.newGoal.weight = '';
      this.newGoal.axisInstanceId = '';
      this.newGoal.goalTypeId = '';
      this.newGoal.projectName = '';
      this.showError = false;
    } else {
      this.showError = true;
    }
  }

  isTotalWeightValid() {
    var goalByAxisInstance = this.goalsByAxisInstanceList.find(g => g.axisInstanceId == this.newGoal.axisInstanceId)
    if (goalByAxisInstance && goalByAxisInstance.totalGoalWeight + this.newGoal.weight > 100) {
      return false;
    }
    return true;
  }

  onChange($event) {
    this.showError = false;
  }

  onChangeGoalType() {
    this.filteredProjects = this.projectList.filter(p => p.goalTypeId === this.newGoal.goalTypeId);
    this.filteredProjects.length > 0 ? this.newGoal.projectName = this.filteredProjects[0].name : '';
  }
}
