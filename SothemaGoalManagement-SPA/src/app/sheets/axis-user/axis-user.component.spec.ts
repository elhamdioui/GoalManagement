/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AxisUserComponent } from './axis-user.component';

describe('AxisUserComponent', () => {
  let component: AxisUserComponent;
  let fixture: ComponentFixture<AxisUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxisUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
