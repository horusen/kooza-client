import { Reminder } from './../reminder.model';
import { BaseListComponent } from 'src/app/shared/base-component';
import { Component, Output, EventEmitter } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetReminderService } from 'src/app/set-reminder/set-reminder.service';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss'],
})
export class ReminderListComponent extends BaseListComponent<Reminder> {
  selectedReminderId: string | undefined;
  @Output() selected = new EventEmitter<string>();
  constructor(
    public reminderService: ReminderService,
    public setReminserService: SetReminderService
  ) {
    super(reminderService);
  }

  selectReminder(id: string) {
    this.selectedReminderId = id;
    this.setReminserService.reminderId.next(this.selectedReminderId);
  }
}
