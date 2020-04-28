import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreanalysisPage } from './scoreanalysis.page';

describe('ScoreanalysisPage', () => {
  let component: ScoreanalysisPage;
  let fixture: ComponentFixture<ScoreanalysisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreanalysisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreanalysisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
