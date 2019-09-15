/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AxisPolesWeightsCardComponent } from './axis-poles-weights-card.component';

describe('AxisPolesWeightsCardComponent', () => {
  let component: AxisPolesWeightsCardComponent;
  let fixture: ComponentFixture<AxisPolesWeightsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxisPolesWeightsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisPolesWeightsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
