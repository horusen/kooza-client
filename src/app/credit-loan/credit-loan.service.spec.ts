import { TestBed } from '@angular/core/testing';

import { CreditLoanService } from './credit-loan.service';

describe('CreditLoanService', () => {
  let service: CreditLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
