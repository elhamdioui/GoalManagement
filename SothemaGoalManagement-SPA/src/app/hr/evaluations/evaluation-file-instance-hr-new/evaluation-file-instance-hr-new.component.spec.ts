/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EvaluationFileInstanceHrNewComponent } from './evaluation-file-instance-hr-new.component';

describe('EvaluationFileInstanceHrNewComponent', () => {
  let component: EvaluationFileInstanceHrNewComponent;
  let fixture: ComponentFixture<EvaluationFileInstanceHrNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationFileInstanceHrNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationFileInstanceHrNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
