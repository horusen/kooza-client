import { ApiResponse } from './../shared/models/ApiResponse';
import { tap, map } from 'rxjs/operators';
import { Product } from './product.model';
import { BaseService } from 'src/app/shared/services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<Product> {
  constructor() {
    super('product');
  }

  getByBusinessId(businessId: string) {
    return this.factory.get(`${this.endPoint}/by-business/${businessId}`).pipe(
      tap({
        next: (response) => {
          this.data = response.data;
        },
      }),
      map((response: ApiResponse<Product>) => response.data)
    );
  }
}
