import { TestBed } from '@angular/core/testing';

import { EnregistreurService } from './enregistreur.service';

describe('EnregistreurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnregistreurService = TestBed.get(EnregistreurService);
    expect(service).toBeTruthy();
  });
});
