import { PaymentMethodType } from './payment-method-type.model';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodTypeService extends BaseService<PaymentMethodType> {
  constructor() {
    super('payment-method-type');
  }
}
