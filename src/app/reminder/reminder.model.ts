import { PaymentMethod } from './../payment-method/payment-method.model';
import { CreditLoan } from '../credit-loan/credit-loan.model';
import { BaseModel } from './../shared/models/BaseModel';

export class Reminder extends BaseModel {
  credit_loan_id?: string;

  date?: Date;

  maessage?: string;

  credit_loan?: CreditLoan;

  payment_methods?: PaymentMethod[];
}
