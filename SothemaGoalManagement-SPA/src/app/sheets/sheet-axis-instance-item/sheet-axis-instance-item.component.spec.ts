/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SheetAxisInstanceItemComponent } from './sheet-axis-instance-item.component';

describe('SheetAxisInstanceItemComponent', () => {
  let component: SheetAxisInstanceItemComponent;
  let fixture: ComponentFixture<SheetAxisInstanceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetAxisInstanceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetAxisInstanceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
