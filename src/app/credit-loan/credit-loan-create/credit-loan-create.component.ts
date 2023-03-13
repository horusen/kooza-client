import { FormGroup, Validators } from '@angular/forms';
import { CreditLoan } from './../credit-loan.model';
import { BaseCreateComponent } from './../../shared/base-component/base-create.component';
import { Component, OnInit } from '@angular/core';
import { CreditLoanService } from '../credit-loan.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-credit-loan-create',
  templateUrl: './credit-loan-create.component.html',
  styleUrls: ['./credit-loan-create.component.scss'],
})
export class CreditLoanCreateComponent
  extends BaseCreateComponent<CreditLoan>
  implements OnInit
{
  constructor(
    public creditLoanService: CreditLoanService,
    public authService: AuthService
  ) {
    super(creditLoanService);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      business_id: [this.authService.business.id, Validators.required],
      customer: this.fb.group({
        name: [null, Validators.required],
        phone_number: [null, Validators.required],
        nin: [null, Validators.required],
      }),
      due_date: [null, Validators.required],
      amount: [null, Validators.required],
      description: [null],
    });
  }
}
