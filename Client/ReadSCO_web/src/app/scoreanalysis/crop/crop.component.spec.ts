import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropComponent } from './crop.component';

describe('CropComponent', () => {
  let component: CropComponent;
  let fixture: ComponentFixture<CropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
