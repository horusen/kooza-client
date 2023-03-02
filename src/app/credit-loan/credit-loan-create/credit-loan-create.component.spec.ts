import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLoanCreateComponent } from './credit-loan-create.component';

describe('CreditLoanCreateComponent', () => {
  let component: CreditLoanCreateComponent;
  let fixture: ComponentFixture<CreditLoanCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditLoanCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditLoanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
