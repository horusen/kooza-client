import { BusinessType } from './../business-type/business-type.model';
import { BaseModel } from './../shared/models/BaseModel';

export class Business extends BaseModel {
  business_type_id?: string;

  name?: string;

  location?: string;

  email_address?: string;

  identifier?: string;

  password?: string;

  business_type?: BusinessType;

  // businessType?: BusinessType;

  // paymentMethods?: PaymentMethod[];
}
