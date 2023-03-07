import { Injectable } from '@angular/core';
import { Modal } from 'flowbite';

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class HelperModal {
  // toggle(id: string): void {
  //   const element = document.getElementById(id);
  //   const modal = new Modal(element);

  //   modal.show();
  // }

  show(id: string): void {
    let element = document.getElementById(id);
    let modal = new Modal(element, { backdrop: 'dynamic', closable: true });

    modal.show();

    //@ts-expect-error
    modal = null;
  }

  hide(id: string): void {
    let element = document.getElementById(id);
    let modal = new Modal(element);

    modal.hide();
  }
}
