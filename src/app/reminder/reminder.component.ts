import { BaseContainerComponent } from './../shared/base-component/base-container.component';
import { Component } from '@angular/core';
import { Reminder } from './reminder.model';
import { ReminderService } from './reminder.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent extends BaseContainerComponent<Reminder> {
  constructor(
    public reminderService: ReminderService,
    public override route: ActivatedRoute
  ) {
    super(reminderService, route, 'reminder');
  }
}
