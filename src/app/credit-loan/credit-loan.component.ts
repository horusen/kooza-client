import { ActivatedRoute } from '@angular/router';
import { BaseContainerComponent } from './../shared/base-component/base-container.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CreditLoan } from './credit-loan.model';
import { CreditLoanService } from './credit-loan.service';

@Component({
  selector: 'app-credit-loan',
  templateUrl: './credit-loan.component.html',
  styleUrls: ['./credit-loan.component.scss'],
})
export class CreditLoanComponent extends BaseContainerComponent<CreditLoan> {
  constructor(
    public creditLoanService: CreditLoanService,
    public override route: ActivatedRoute
  ) {
    super(creditLoanService, route, 'credit-loan');
  }
}
