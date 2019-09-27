import { TestBed } from '@angular/core/testing';

import { VerovioService } from './verovio-service.service';

describe('VerovioServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerovioService = TestBed.get(VerovioService);
    expect(service).toBeTruthy();
  });
});
