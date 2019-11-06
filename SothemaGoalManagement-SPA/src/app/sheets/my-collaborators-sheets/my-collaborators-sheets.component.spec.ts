/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyCollaboratorsSheetsComponent } from './my-collaborators-sheets.component';

describe('MyCollaboratorsSheetsComponent', () => {
  let component: MyCollaboratorsSheetsComponent;
  let fixture: ComponentFixture<MyCollaboratorsSheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCollaboratorsSheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollaboratorsSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
