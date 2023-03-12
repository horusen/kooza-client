import { CustomMessage } from './../custom-message/custom-message.model';
import { PaymentMethod } from './../payment-method/payment-method.model';
import { CreditLoan } from '../credit-loan/credit-loan.model';
import { BaseModel } from './../shared/models/BaseModel';

export class Reminder extends BaseModel {
  date?: Date;

  credit_loan_id?: string;

  custom_message_id?: string;

  payment_method_ids?: string[];

  credit_loan?: CreditLoan;

  custom_message?: CustomMessage;

  payment_methods?: PaymentMethod[];
}
