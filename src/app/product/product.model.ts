import { BaseModel } from './../shared/models/BaseModel';

export class Product extends BaseModel {
  name?: string;
  unit_price?: number;
  business?: string;
}
