import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMessageComponent } from './custom-message.component';
import { CustomMessageCreateComponent } from './custom-message-create/custom-message-create.component';
import { CustomMessageListComponent } from './custom-message-list/custom-message-list.component';

@NgModule({
  declarations: [CustomMessageComponent, CustomMessageCreateComponent, CustomMessageListComponent],
  imports: [CommonModule, SharedModule],
  exports: [CustomMessageComponent],
})
export class CustomMessageModule {}
