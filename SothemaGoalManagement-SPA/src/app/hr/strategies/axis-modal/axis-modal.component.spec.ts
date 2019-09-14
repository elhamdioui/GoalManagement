/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AxisModalComponent } from './axis-modal.component';

describe('AxisModalComponent', () => {
  let component: AxisModalComponent;
  let fixture: ComponentFixture<AxisModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxisModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
