import { BaseModel } from './../shared/models/BaseModel';
export class CustomMessage extends BaseModel {
  title?: string;

  message?: string;

  busines_id?: string;
}
