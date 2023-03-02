import { Helper } from 'src/app/helpers/helper/helper';
import { AppInjector } from './../services/app-injector.service';
import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

interface Subscriptions {
  [k: string]: Subscription;
}

@Component({
  selector: '',
  template: '',
  styles: [],
})
export abstract class BaseSoloComponent<T = any> implements OnDestroy {
  @Input() element: T | undefined;
  public helper: Helper;

  public subscriptions: Subscriptions = {};

  constructor() {
    this.helper = AppInjector.injector.get(Helper);
  }

  unsubscribe(subscriptions: Subscriptions) {
    Object.keys(subscriptions).forEach((key) => {
      subscriptions[key].unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe(this.subscriptions);
  }
}
