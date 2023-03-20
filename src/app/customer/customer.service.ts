import { Customer } from './customer.model';
import { ApiResponse } from './../shared/models/ApiResponse';
import { tap, map } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService<Customer> {
  constructor() {
    super('customer');
  }

  getByBusinessId(businessId: string) {
    return this.factory.get(`${this.endPoint}/by-business/${businessId}`).pipe(
      tap({
        next: (response) => {
          this.data = response.data;
        },
      }),
      map((response: ApiResponse<Customer>) => response.data)
    );
  }
}
