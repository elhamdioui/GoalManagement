/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GoalEvaluationModalComponent } from './goal-evaluation-modal.component';

describe('GoalEvaluationModalComponent', () => {
  let component: GoalEvaluationModalComponent;
  let fixture: ComponentFixture<GoalEvaluationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalEvaluationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalEvaluationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
