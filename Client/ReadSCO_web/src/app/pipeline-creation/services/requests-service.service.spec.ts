import { TestBed } from '@angular/core/testing';

import { RequestsServiceService } from './requests-service.service';

describe('RequestsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestsServiceService = TestBed.get(RequestsServiceService);
    expect(service).toBeTruthy();
  });
});
