/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MySheetsListComponent } from './my-sheets-list.component';

describe('MySheetsListComponent', () => {
  let component: MySheetsListComponent;
  let fixture: ComponentFixture<MySheetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySheetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySheetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
