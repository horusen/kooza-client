import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodComponent } from './payment-method.component';
import { PaymentMethodCreateComponent } from './payment-method-create/payment-method-create.component';

@NgModule({
  declarations: [PaymentMethodComponent, PaymentMethodCreateComponent],
  imports: [CommonModule, SharedModule],
  exports: [PaymentMethodComponent],
})
export class PaymentMethodModule {}
