import { CreditLoanStatus } from './../credit-loan-status/credit-loan-status.model';
import { Business } from './../business/business.model';
import { BaseModel } from './../shared/models/BaseModel';

export class CreditLoan extends BaseModel {
  business_id?: string;

  customer_id?: string;

  credit_loan_status_id?: string;

  due_date?: Date;

  amount?: number;

  business?: Business;

  // customer?: Customer;

  credit_loan_status?: CreditLoanStatus;
}
