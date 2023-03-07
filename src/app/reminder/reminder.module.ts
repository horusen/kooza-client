import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderComponent } from './reminder.component';
import { ReminderCreateComponent } from './reminder-create/reminder-create.component';
import { SharedModule } from '../shared/shared.module';
import { ReminderListComponent } from './reminder-list/reminder-list.component';

@NgModule({
  declarations: [
    ReminderComponent,
    ReminderCreateComponent,
    ReminderListComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [ReminderComponent],
})
export class ReminderModule {}
