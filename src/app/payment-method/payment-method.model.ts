import { BaseModel } from './../shared/models/BaseModel';
import { PaymentMethodType } from './payment-method-type/payment-method-type.model';
export class PaymentMethod extends BaseModel {
  name?: string;

  payment_method_type_id?: string;

  paymentMethodtype?: PaymentMethodType;

  provider_name?: string;

  account_number?: string;
}
