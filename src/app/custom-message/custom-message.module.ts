import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMessageComponent } from './custom-message.component';
import { CustomMessageCreateComponent } from './custom-message-create/custom-message-create.component';

@NgModule({
  declarations: [CustomMessageComponent, CustomMessageCreateComponent],
  imports: [CommonModule, SharedModule],
  exports: [CustomMessageComponent],
})
export class CustomMessageModule {}
