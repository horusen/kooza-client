import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services';
import { BusinessType } from './business-type.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessTypeService extends BaseService<BusinessType> {
  constructor() {
    super('business-type');
  }
}
