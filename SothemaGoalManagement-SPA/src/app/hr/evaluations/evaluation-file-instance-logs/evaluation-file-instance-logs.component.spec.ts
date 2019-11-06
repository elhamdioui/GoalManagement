/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EvaluationFileInstanceLogsComponent } from './evaluation-file-instance-logs.component';

describe('EvaluationFileInstanceLogsComponent', () => {
  let component: EvaluationFileInstanceLogsComponent;
  let fixture: ComponentFixture<EvaluationFileInstanceLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationFileInstanceLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationFileInstanceLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
