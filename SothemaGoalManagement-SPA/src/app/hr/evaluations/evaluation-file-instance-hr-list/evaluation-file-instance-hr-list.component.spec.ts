/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EvaluationFileInstanceHrListComponent } from './evaluation-file-instance-hr-list.component';

describe('EvaluationFileInstanceHrListComponent', () => {
  let component: EvaluationFileInstanceHrListComponent;
  let fixture: ComponentFixture<EvaluationFileInstanceHrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationFileInstanceHrListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationFileInstanceHrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
