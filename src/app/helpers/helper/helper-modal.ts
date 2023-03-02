import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class HelperModal {
  toggle(id: string): void {
    $('#' + id).modal('toggle');
  }

  show(id: string): void {
    $('#' + id).modal('show');
  }

  hide(id: string): void {
    $('#' + id).modal('hide');
  }
}
