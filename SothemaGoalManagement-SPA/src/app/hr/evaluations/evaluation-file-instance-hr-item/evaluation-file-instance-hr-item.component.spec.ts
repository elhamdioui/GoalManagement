/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EvaluationFileInstanceHrItemComponent } from './evaluation-file-instance-hr-item.component';

describe('EvaluationFileInstanceHrItemComponent', () => {
  let component: EvaluationFileInstanceHrItemComponent;
  let fixture: ComponentFixture<EvaluationFileInstanceHrItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationFileInstanceHrItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationFileInstanceHrItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
