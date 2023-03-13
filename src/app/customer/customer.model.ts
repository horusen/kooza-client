import { BaseModel } from '../shared/models/BaseModel';

export class Customer extends BaseModel {
  name?: string;

  phone_number?: string;

  email_address?: string;

  nin?: string;
}
