import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from './base.component';
import { BaseService } from '../services/base.service';

@Component({
  selector: '',
  template: '',
  styles: [],
})
export class BaseSingleComponent<T>
  extends BaseComponent<T>
  implements OnInit, OnDestroy
{
  single: T | null | undefined = null;
  public enableSubscribeToSingleData: boolean = true;
  public enableEmitLoading: boolean = false;
  public enableSubscribeToLoading: boolean = false;
  public enableFetchDataFromURL: boolean = false;

  constructor(
    public override service: BaseService<T>,
    public route?: ActivatedRoute
  ) {
    super(service);
  }

  ngOnInit() {
    if (this.enableFetchDataFromURL) {
      this.show(this.route!);
    }

    if (this.enableSubscribeToSingleData) {
      this.subscriptions['single'] = this.service.item$.subscribe((single) => {
        this.single = single;
      });
    }
  }

  show(route: ActivatedRoute) {
    route.params.subscribe((param) => {
      this.loading = true;
      let id = param['id'];
      this.service.getSingle(id).subscribe(() => {
        this.loading = false;
      });
    });
  }
}
