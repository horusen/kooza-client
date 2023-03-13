import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperDropdownSettings {
  single = {
    singleSelection: true,
    labelKey: 'name',
    enableSearchFilter: true,
    disabled: false,
    classes:
      'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500',
  };

  singleDisabled = {
    ...this.single,
    disabled: true,
  };

  multi = {
    singleSelection: false,
    selectAllText: 'Tout selectionner',
    unSelectAllText: 'Tout deselectionner',
    itemsShowLimit: 5,
    labelKey: 'name',
    enableSearchFilter: true,
  };
}
