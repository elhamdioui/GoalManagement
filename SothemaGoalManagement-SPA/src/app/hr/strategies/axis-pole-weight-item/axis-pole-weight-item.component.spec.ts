/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AxisPoleWeightItemComponent } from './axis-pole-weight-item.component';

describe('AxisPoleWeightItemComponent', () => {
  let component: AxisPoleWeightItemComponent;
  let fixture: ComponentFixture<AxisPoleWeightItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxisPoleWeightItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisPoleWeightItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
