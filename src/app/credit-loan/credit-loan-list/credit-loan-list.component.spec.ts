import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLoanListComponent } from './credit-loan-list.component';

describe('CreditLoanListComponent', () => {
  let component: CreditLoanListComponent;
  let fixture: ComponentFixture<CreditLoanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditLoanListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditLoanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
