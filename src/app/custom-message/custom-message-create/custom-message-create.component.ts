import { AuthService } from 'src/app/auth/auth.service';
import { Validators } from '@angular/forms';
import { CustomMessageService } from './../custom-message.service';
import { CustomMessage } from './../custom-message.model';
import { BaseCreateComponent } from './../../shared/base-component/base-create.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-message-create',
  templateUrl: './custom-message-create.component.html',
  styleUrls: ['./custom-message-create.component.scss'],
})
export class CustomMessageCreateComponent
  extends BaseCreateComponent<CustomMessage>
  implements OnInit
{
  constructor(
    public customMessageService: CustomMessageService,
    public authService: AuthService
  ) {
    super(customMessageService);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      business_id: [this.authService.business.id, Validators.required],
      title: [null, Validators.required],
      message: [null, Validators.required],
    });
  }
}
