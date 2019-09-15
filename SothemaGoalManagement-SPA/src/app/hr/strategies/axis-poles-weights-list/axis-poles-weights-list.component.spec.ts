/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AxisPolesWeightsListComponent } from './axis-poles-weights-list.component';

describe('AxisPolesWeightsListComponent', () => {
  let component: AxisPolesWeightsListComponent;
  let fixture: ComponentFixture<AxisPolesWeightsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxisPolesWeightsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisPolesWeightsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
