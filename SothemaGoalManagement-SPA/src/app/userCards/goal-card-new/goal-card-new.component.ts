import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { GoalCard } from '../../_models/GoalCard';

@Component({
  selector: 'app-goal-card-new',
  templateUrl: './goal-card-new.component.html',
  styleUrls: ['./goal-card-new.component.css']
})
export class GoalCardNewComponent implements OnInit {
  @Output() cancelCreation = new EventEmitter();
  @Output() switchOffCreation = new EventEmitter();
  newGoalCard: GoalCard;
  newForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.newForm = this.fb.group(
      {
        year: [null, Validators.required]
      });
  }

  cancel() {
    this.cancelCreation.emit(false);
  }
}
