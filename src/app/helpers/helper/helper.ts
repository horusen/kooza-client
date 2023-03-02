import { Injectable } from '@angular/core';
import { helperArrayObject } from './helper-array-object';
import { HelperDropdownSettings } from './helper-dropdown-settings';
import { HelperFile } from './helper-file';
import { HelperModal } from './helper-modal';
import { HelperNavigation } from './helper-navigation';
import { HelperNotification } from './helper-notification';
import { HelperObject } from './helper-object';
import { HelperText } from './helper-text';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  constructor(
    public notification: HelperNotification,
    public arrayObject: helperArrayObject,
    public file: HelperFile,
    public dropdownSettings: HelperDropdownSettings,
    public modal: HelperModal,
    public navigation: HelperNavigation,
    public object: HelperObject,
    public text: HelperText
  ) {}
}
