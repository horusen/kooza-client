import { CustomMessageService } from './../custom-message.service';
import { BaseListComponent } from 'src/app/shared/base-component';
import { CustomMessage } from './../custom-message.model';
import { Component, Output, EventEmitter } from '@angular/core';
import { SetReminderService } from 'src/app/set-reminder/set-reminder.service';

@Component({
  selector: 'app-custom-message-list',
  templateUrl: './custom-message-list.component.html',
  styleUrls: ['./custom-message-list.component.scss'],
})
export class CustomMessageListComponent extends BaseListComponent<CustomMessage> {
  selected: string | undefined;
  @Output() outputSelected = new EventEmitter<string>();
  constructor(
    public messageService: CustomMessageService,
    public setReminserService: SetReminderService
  ) {
    super(messageService);
  }

  select(id: string) {
    this.selected = id;
    this.setReminserService.messageId.next(this.selected);
  }
}
