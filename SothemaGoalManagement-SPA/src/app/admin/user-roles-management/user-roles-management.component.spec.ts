/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserRolesManagementComponent } from './user-roles-management.component';

describe('UserRolesManagementComponent', () => {
  let component: UserRolesManagementComponent;
  let fixture: ComponentFixture<UserRolesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserRolesManagementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
