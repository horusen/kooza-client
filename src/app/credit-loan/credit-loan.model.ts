import { Reminder } from './../reminder/reminder.model';
import { CreditLoanStatus } from './../credit-loan-status/credit-loan-status.model';
import { Business } from './../business/business.model';
import { BaseModel } from './../shared/models/BaseModel';
import { Customer } from '../customer/customer.model';

export class CreditLoan extends BaseModel {
  business_id?: string;

  customer_id?: string;

  credit_loan_status_id?: string;

  due_date?: Date;

  amount?: number;

  business?: Business;

  customer?: Customer;

  description?: String;

  credit_loan_status?: CreditLoanStatus;

  reminders?: Reminder[];
}
