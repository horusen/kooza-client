import { TestBed } from '@angular/core/testing';

import { SetReminderService } from './set-reminder.service';

describe('SetReminderService', () => {
  let service: SetReminderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetReminderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
