import { TestBed } from '@angular/core/testing';

import { CreditLoanStatusService } from './credit-loan-status.service';

describe('CreditLoanStatusService', () => {
  let service: CreditLoanStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditLoanStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
