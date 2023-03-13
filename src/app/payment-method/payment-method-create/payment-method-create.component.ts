import { PaymentMethodType } from './../payment-method-type/payment-method-type.model';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { BaseCreateComponent } from 'src/app/shared/base-component';
import { PaymentMethod } from '../payment-method.model';
import { PaymentMethodService } from '../payment-method.service';
import { PaymentMethodTypeService } from '../payment-method-type/payment-method-type.service';

@Component({
  selector: 'app-payment-method-create',
  templateUrl: './payment-method-create.component.html',
  styleUrls: ['./payment-method-create.component.scss'],
})
export class PaymentMethodCreateComponent
  extends BaseCreateComponent<PaymentMethod>
  implements OnInit
{
  paymentMethodTypes: PaymentMethodType[] = [];

  constructor(
    public paymentMethodService: PaymentMethodService,
    public paymentMethodTypeService: PaymentMethodTypeService,
    public authService: AuthService
  ) {
    super(paymentMethodService);
  }

  ngOnInit(): void {
    this.initForm();

    this.subscriptions['paymentMethodTypes'] = this.paymentMethodTypeService
      .get()
      .subscribe((data) => {
        this.paymentMethodTypes = data;
      });
  }

  initForm() {
    this.form = this.fb.group({
      business_id: [this.authService.business.id, Validators.required],
      name: [null, Validators.required],
      payment_method_id: [null, Validators.required],
      provider_name: [null, Validators.required],
      account_number: [null, Validators.required],
    });
  }
}
