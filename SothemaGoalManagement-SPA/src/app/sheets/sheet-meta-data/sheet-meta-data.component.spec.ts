/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SheetMetaDataComponent } from './sheet-meta-data.component';

describe('SheetMetaDataComponent', () => {
  let component: SheetMetaDataComponent;
  let fixture: ComponentFixture<SheetMetaDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetMetaDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
