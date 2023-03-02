import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperDropdownSettings {
  single = {
    singleSelection: true,
    labelKey: 'libelle',
    enableSearchFilter: true,
    disabled: false,
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
    labelKey: 'libelle',
    enableSearchFilter: true
  };
}
