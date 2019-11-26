/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BehavioralSkillListEvaluationComponent } from './behavioral-skill-list-evaluation.component';

describe('BehavioralSkillListEvaluationComponent', () => {
  let component: BehavioralSkillListEvaluationComponent;
  let fixture: ComponentFixture<BehavioralSkillListEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BehavioralSkillListEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BehavioralSkillListEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
