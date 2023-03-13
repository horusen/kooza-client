import { TestBed } from '@angular/core/testing';

import { EnregistreurVideoService } from './enregistreur-video.service';

describe('EnregistreurVideoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnregistreurVideoService = TestBed.get(EnregistreurVideoService);
    expect(service).toBeTruthy();
  });
});
