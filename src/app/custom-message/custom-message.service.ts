import { CustomMessage } from './custom-message.model';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services';

@Injectable({
  providedIn: 'root',
})
export class CustomMessageService extends BaseService<CustomMessage> {
  constructor() {
    super('custom-message');
  }
}
