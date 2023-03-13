import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLoanComponent } from './credit-loan.component';

describe('CreditLoanComponent', () => {
  let component: CreditLoanComponent;
  let fixture: ComponentFixture<CreditLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
