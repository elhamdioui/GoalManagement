/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BehavioralSkillsCardComponent } from './behavioral-skills-card.component';

describe('BehavioralSkillsCardComponent', () => {
  let component: BehavioralSkillsCardComponent;
  let fixture: ComponentFixture<BehavioralSkillsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BehavioralSkillsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BehavioralSkillsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
