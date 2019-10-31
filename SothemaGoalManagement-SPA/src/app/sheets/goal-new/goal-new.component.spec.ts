/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GoalNewComponent } from './goal-new.component';

describe('GoalNewComponent', () => {
  let component: GoalNewComponent;
  let fixture: ComponentFixture<GoalNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
