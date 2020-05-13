import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineCreationPage } from './pipeline-creation.page';

describe('PipelineCreationPage', () => {
  let component: PipelineCreationPage;
  let fixture: ComponentFixture<PipelineCreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineCreationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
