import { CustomMessageService } from './../custom-message.service';
import { BaseListComponent } from 'src/app/shared/base-component';
import { CustomMessage } from './../custom-message.model';
import { Component, Output, EventEmitter } from '@angular/core';
import { ReminderService } from 'src/app/reminder/reminder.service';

@Component({
  selector: 'app-custom-message-list',
  templateUrl: './custom-message-list.component.html',
  styleUrls: ['./custom-message-list.component.scss'],
})
export class CustomMessageListComponent extends BaseListComponent<CustomMessage> {
  selected: string | undefined | null;
  @Output() outputSelected = new EventEmitter<string>();
  constructor(
    public messageService: CustomMessageService,
    public reminderService: ReminderService
  ) {
    super(messageService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions['reminderCustomMessageId'] =
      this.reminderService.customMessageId$.subscribe((customMessageId) => {
        this.selected = customMessageId;
      });
  }

  select(id: string) {
    this.reminderService.customMessageId$.next(id);
  }
}
