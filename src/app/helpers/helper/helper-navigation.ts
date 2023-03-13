import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HelperNavigation {
  constructor(private router: Router, private _route: ActivatedRoute) {}

  navigate(path: string[], queryParams?: {}, fragment?: string): void {
    this.router.navigate(path, {
      queryParams: queryParams,
      fragment: fragment,
      relativeTo: this._route,
    });
  }

  appendFragementToUrl(fragement: string): void {
    this.navigate([this.router.url.split('#')[0]], {}, fragement);
  }

  reloadPage(path: string[], queryParams?: {}, fragment?: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(path, {
        queryParams: queryParams,
        fragment: fragment,
      });
    });
  }

  checkIfUrlHasItem(route: ActivatedRouteSnapshot, item: string): boolean {
    const url = route.pathFromRoot
      .map((v) => v.url.map((segment) => segment.toString()).join('/'))
      .filter((item) => item);

    return url.includes(item);
  }

  addParams(route: ActivatedRoute, params: Params): void {
    this.router.navigate(['./'], {
      queryParams: params,
      relativeTo: route,
      queryParamsHandling: 'merge',
    });
  }

  getParams(route: ActivatedRoute, params: string): string {
    return route.snapshot.queryParams[params];
  }

  deleteFragmentFromUrl(): void {
    const url = this.router.url.split('#')[0];

    this.router.navigateByUrl(url);
  }

  urlParamsToObject(params: any) {
    let returnedObject: any = {};
    Object.keys(params).forEach((key) => {
      if (+params[key][1]) {
        returnedObject[key] = params[key].split(',');
        returnedObject[key].map((item: string) => parseInt(item));
      } else {
        returnedObject[key] = [+params[key]];
      }
    });

    return returnedObject;
  }

  getCurrentUrl(): string {
    return this.router.url.split('?')[0];
  }

  // convertObjectToQueryParamsUrl(object: any) {
  //   let queryParams: string = '';
  //   let index: number = 0;
  //   object = this.omitEmptyArraysInObject(object);
  //   object = this.omitNullValueInObject(object);
  //   Object.keys(object).forEach((key) => {
  //     if (object[key] instanceof Array) {
  //       queryParams += `${index > 0 ? '&' : ''}${key}=${object[key].join(',')}`;
  //     } else {
  //       queryParams += `${index > 0 ? '&' : ''}${key}=${object[key]}`;
  //     }
  //     index += 1;
  //   });

  //   return queryParams;
  // }

  getLastUrlFragment(url: string): string {
    const urlWithoutQueryParams = url.split('?')[0];
    const fragmentedUrl = urlWithoutQueryParams.split('/');
    return fragmentedUrl[fragmentedUrl.length - 1];
  }
}
