import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BaseCreateComponent } from './base-create.component';
import { BaseService } from '../services/base.service';

@Component({
  selector: '',
  template: '',
  styles: [],
})
export class BaseEditComponent<T>
  extends BaseCreateComponent<T>
  implements OnInit
{
  single: any;

  constructor(public override service: BaseService<T>) {
    super(service);
  }

  ngOnInit() {
    // super.ngOnInit();

    this.subscriptions['_single'] = this.service.item$.subscribe(
      (single) => (this.single = single)
    );
  }

  initFormWithData(
    data: any,
    requiredField: string[] = [],
    ignoreField: string[] = [],
    callback?: Function
  ) {
    this.form = this.fb.group({});
    Object.keys(data).forEach((key, index) => {
      if (!ignoreField.includes(key)) {
        if (requiredField.includes(key)) {
          this.form.addControl(
            key,
            new FormControl(data[key], Validators.required)
          );
        } else {
          this.form.addControl(key, new FormControl(data[key]));
        }
      }
    });
    if (callback) {
      callback();
    }

    this.isFormOk = true;
  }
}
