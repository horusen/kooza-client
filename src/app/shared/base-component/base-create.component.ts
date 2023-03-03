import { Router } from '@angular/router';
import { AppInjector } from './../services/app-injector.service';
import { BaseComponent } from './base.component';

import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { BaseService } from '../services/base.service';
// import ClassicEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: '',
  template: '',
  styles: [],
})
export class BaseCreateComponent<T>
  extends BaseComponent<T>
  implements OnDestroy
{
  /* PROPRIÉTÉS */
  public isFormOk = false; // permet de savoir si le formulaire est pret à etre rendu dans la vues
  public form!: FormGroup; // Formulaire d'ajout
  public formData: FormData = new FormData();
  // public editor = ClassicEditor; // Editor variable
  @Output() created = new EventEmitter();
  @Output() edited = new EventEmitter();

  public configCalendrier = {
    // Configuration de ng2DatePicker
    day: {
      format: 'YYYY-MM-DD',
      theme: 'material',
    },
    year: {
      format: 'YYYY',
      theme: 'material',
      mode: 'month',
    },
    hour: {
      format: 'HH:MM',
      showTwentyFourHours: true,
      timeSeparator: ':',
    },
  };

  public fb: FormBuilder;
  public router: Router;

  /* CONSTRUCTOR */
  constructor(public override service: BaseService<T>) {
    super(service);
    this.fb = AppInjector.injector.get(FormBuilder);
    this.router = AppInjector.injector.get(Router);
  }

  /* METHODS */

  addBlurField(name: string, required?: boolean) {
    this.form.addControl(
      name,
      new FormControl(
        '',
        required
          ? {
              validators: [Validators.required],
              updateOn: 'blur',
            }
          : {
              updateOn: 'blur',
            }
      )
    );
  }

  addBlurFields(fields: { name: string; required?: boolean }[]) {
    fields.forEach((field) => {
      this.addBlurField(field.name, field.required);
    });
  }

  formValue(field: string & keyof T) {
    return this.form.get(field)?.value;
  }

  formControl(field: string) {
    return this.form.get(field);
  }

  selectFormHandler(target: string & keyof T, data: any): void {
    this.form.get(target)?.patchValue(data.value);
  }

  formValueComparer(
    minField: string & keyof T,
    maxField: string & keyof T,
    alertMessage: string,
    isDate: boolean = false
  ) {
    this.form.controls[minField].valueChanges.subscribe((value) => {
      if (isDate) {
        if (this.form.controls[maxField].value) {
          if (
            new Date(this.form.controls[minField].value) >
            new Date(this.form.controls[maxField].value)
          ) {
            this.helper.notification.alertDanger(alertMessage);
            this.form.controls[maxField].setValue(null, {
              emitEvent: false,
            });
          }
        }
      } else {
        if (this.form.controls[maxField].value) {
          if (
            this.form.controls[minField].value >
            this.form.controls[maxField].value
          ) {
            this.helper.notification.alertDanger(alertMessage);
            this.form.controls[maxField].setValue(null, {
              emitEvent: false,
            });
          }
        }
      }
    });
    this.form.controls[maxField].valueChanges.subscribe((value) => {
      if (isDate) {
        if (
          new Date(this.form.controls[minField].value) >
          new Date(this.form.controls[maxField].value)
        ) {
          this.helper.notification.alertDanger(alertMessage);
          this.form.controls[maxField].setValue(null, {
            emitEvent: false,
          });
        }
      } else {
        if (
          this.form.controls[minField].value >
          this.form.controls[maxField].value
        ) {
          this.helper.notification.alertDanger(alertMessage);
          this.form.controls[maxField].setValue(null, {
            emitEvent: false,
          });
        }
      }
    });
  }

  addControls(names: string[], values: any[] = [], isRequired: boolean[] = []) {
    if (isRequired[0] && values[0]) {
      let counter = 0;
      names.forEach((name) => {
        this.addControl(name, values[counter], isRequired[counter]);
        counter++;
      });
    } else if (isRequired[0] && !values[0]) {
      let counter = 0;
      names.forEach((name) => {
        this.addControl(name, null, isRequired[counter]);
        counter++;
      });
    } else if (!isRequired[0] && values[0]) {
      let counter = 0;
      names.forEach((name) => {
        this.addControl(name, values[0]);
        counter++;
      });
    } else {
      names.forEach((name) => this.addControl(name));
    }
  }

  addControl(name: string, value: any = null, isRequired: boolean = false) {
    if (isRequired) {
      this.form.addControl(name, new FormControl(value, Validators.required));
    } else {
      this.form.addControl(name, new FormControl(value));
    }
  }

  addValidators(name: string, validators: ValidatorFn[]): void {
    if (Object.keys(this.form.controls).includes(name)) {
      this.form.controls[name].setValidators(validators);
      this.form.controls[name].updateValueAndValidity();
    }
  }

  removeValidators(name: string): void {
    this.addValidators(name, []);
  }

  formValuePatcher<Key extends string & keyof T>(field: Key, value: T[Key]) {
    // if (this.schema.hasOwnProperty(field)) {
    this.form.controls[field].patchValue(value);
    // } else {
    //   this.helper.toastDanger(`le champs ${field} n'existe pas dans la table`);
    // }
  }

  shouldShowRequiredError(field: string) {
    return this.shouldShowError(field, 'required');
    // const control = this.form.get(field);
    // if (control?.touched) {
    //   return control.errors?.required;
    // }
  }

  shouldShowError(field: string, errorType: string): boolean {
    const control = this.form.get(field);
    if (control?.touched && control.errors) {
      return control?.errors[errorType];
    }

    return false;
  }

  isValid(field: string) {
    const control = this.form.get(field);
    return control?.touched && control.valid;
  }

  fillFormData(object: any) {
    Object.keys(object).forEach((key) => {
      this.formData.append(key, object[key]);
    });
  }

  // TODO: Gérer la validation des images
  onFileChanged(event: any, name: string = 'image') {
    let fichier: File = event.target.files[0];
    // if (fichier.type !== 'application/pdf') {
    //   return this.helper.alertDanger('Format Invalide');
    // }

    this.formData.append(name, fichier);
  }

  formInvalidError() {
    this.helper.notification.toastDanger('Formulaire');
  }

  create() {
    console.log(this.form.value);

    // this.loading = true;
    // this.service.store(this.form.value).subscribe(() => {
    //   this.loading = false;
    //   this.form.reset();
    //   this.helper.navigation.deleteFragmentFromUrl();
    //   this.helper.notification.alertSuccess();
    // });
  }
}
