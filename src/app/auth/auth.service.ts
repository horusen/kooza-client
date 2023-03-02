import { ApiResponse } from './../shared/models/ApiResponse';
import { Business } from './../business/business.model';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '../helpers/storage/storage';
import { BaseService } from '../shared/services';

interface LoginInformation {
  business: Business;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<any> {
  constructor(public storage: Storage) {
    super('auth');
  }

  public signup(elements: Business) {
    return this.factory.post(`auth/signup/`, elements).pipe(
      tap({
        next: (response) => {
          this.storeLoginInformation(response.data);
        },
      })
    );
  }

  // TODO: Ensure type safety
  public login(elements: Business) {
    return this.factory.post(`auth/login/`, elements).pipe(
      tap({
        next: ({ data }: any) => {
          this.storeLoginInformation(data);
        },
      }),
      map((response) => response.business)
    );
  }

  private storeLoginInformation(data: any) {
    this.storage.clear();
    this.storage.set('accessToken', data.accessToken);
    this.storage.set('business', data.business);
  }
}
