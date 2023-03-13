import { PaymentMethod } from './payment-method.model';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService extends BaseService<PaymentMethod> {
  constructor() {
    super('payment-method');
  }
}
