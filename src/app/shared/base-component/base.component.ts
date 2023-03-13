import { AppInjector } from './../services/app-injector.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Helper } from 'src/app/helpers/helper/helper';

import { BaseService } from '../services/base.service';

interface Subscriptions {
  [k: string]: Subscription;
}

@Component({
  selector: '',
  template: '',
  styles: [],
})
export abstract class BaseComponent<T> implements OnDestroy {
  public loading = false;
  public data: T[] = [];
  public subscriptions: Subscriptions = {};

  public helper: Helper;
  // public auth: AuthService = null;

  constructor(public service?: BaseService<T>) {
    this.helper = AppInjector.injector.get(Helper);
    // this.auth = AppInjector.injector.get(AuthService);
  }

  /* ONDESTROY */
  ngOnDestroy(): void {
    this.unsubscribe(this.subscriptions);
  }

  unsubscribe(subscriptions: Subscriptions) {
    Object.keys(subscriptions).forEach((key) => {
      subscriptions[key].unsubscribe();
    });
  }
}
