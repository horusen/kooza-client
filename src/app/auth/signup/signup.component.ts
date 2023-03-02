import { BusinessTypeService } from './../../business-type/business-type.service';
import { BusinessType } from './../../business-type/business-type.model';
import { Validators } from '@angular/forms';
import { Business } from './../../business/business.model';
import { BaseCreateComponent } from './../../shared/base-component/base-create.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent
  extends BaseCreateComponent<Business>
  implements OnInit
{
  businessTypes: BusinessType[] = [];

  constructor(
    public authService: AuthService,
    public businessTypeService: BusinessTypeService
  ) {
    super(authService);
  }

  ngOnInit(): void {
    this.initForm();
    this.subscriptions['business_type'] = this.businessTypeService
      .get()
      .subscribe((response) => {
        this.businessTypes = response;
      });
  }

  initForm() {
    this.form = this.fb.group({
      business_type: [null, Validators.required],
      name: [null, Validators.required],
      location: [null, Validators.required],
      email_address: [null, Validators.required],
      identifier: [null, Validators.required],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required],
    });
  }

  signup(): void {
    this.loading = true;
    this.authService
      .signup({
        ...this.form.value,
        business_type_id: this.formValue('business_type')[0].id,
        business_type: null,
      })
      .subscribe((response) => {
        this.loading = false;
        this.initForm();
        this.created.emit();
        this.helper.notification.toastSuccess();
      });
  }
}
