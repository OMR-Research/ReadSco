import { TestBed } from '@angular/core/testing';

import { MidiPlayerService } from './midi-player.service';

describe('MidiPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MidiPlayerService = TestBed.get(MidiPlayerService);
    expect(service).toBeTruthy();
  });
});
