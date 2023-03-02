import { TestBed } from '@angular/core/testing';

import { EnregistreurAudioService } from './enregistreur-audio.service';

describe('EnregistreurAudioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnregistreurAudioService = TestBed.get(EnregistreurAudioService);
    expect(service).toBeTruthy();
  });
});
