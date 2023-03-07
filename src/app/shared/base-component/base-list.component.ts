import { BaseComponent } from './base.component';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { BaseService } from '../services/base.service';
import { AppInjector } from '../services';

@Component({
  selector: '',
  template: '',
  styles: [],
})
export abstract class BaseListComponent<T>
  extends BaseComponent<T>
  implements OnInit, AfterViewInit
{
  public router: Router;

  public override data: T[] = [];
  public showFilter = false;

  constructor(public override service: BaseService<T>) {
    super(service);
    this.router = AppInjector.injector.get(Router);
  }

  ngOnInit(): void {
    this.loading = true;
    this.service.get().subscribe(() => {
      this.loading = false;
      console.log(this.service.data);
    });
  }

  ngAfterViewInit(): void {
    // this.route.fragment.subscribe((fragment) => {
    //   if (fragment === 'showFilter') {
    //     this.showFilter = true;
    //     this.helper.modal.show(`${this.element}-filter-modal`);
    //   }
    // });
  }

  async supprimer(item: T & { id?: string }) {
    this.helper.notification.confirm(async () => {
      this.loading = true;

      await this.service.delete(item.id!);
      this.loading = false;
      this.helper.notification.alertSuccess();
    });
  }
}
