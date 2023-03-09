import { Factory } from './../../helpers/factory/factory';
import { map, tap } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Params } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse';
import { PaginationInfo } from '../interfaces/pagination-info.interface';
import { Helper } from '../../helpers/helper/helper';
import { AppInjector } from './app-injector.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T = any> {
  public _data: T[] = [];
  protected _singleData: T | undefined;
  protected _paginationInfo: PaginationInfo | undefined;

  protected factory: Factory;
  protected helper: Helper;

  public singleData$ = new ReplaySubject<T | undefined | null>(1);
  public data$ = new ReplaySubject<T[]>(1);
  public paginationInfo$ = new ReplaySubject<PaginationInfo>();

  public lastItemcreated$ = new Subject<T>();
  public lastItemEdited$ = new Subject<T>();
  public lastItemDeleted$ = new Subject<T>();

  set data(data: T[]) {
    this._data = data;
    this.data$.next(this._data);
  }

  set singleData(singleData: T | undefined) {
    // if (singleData) {
    this._singleData = singleData;
    this.singleData$.next(this._singleData);
    // }
  }

  set paginationInfo(paginationInfo: PaginationInfo) {
    this._paginationInfo = paginationInfo;
    this.paginationInfo$.next(this._paginationInfo);
  }

  set lastItemCreated(item: any) {
    this.lastItemcreated$.next(item);
  }

  set lastItemDeleted(item: any) {
    this.lastItemDeleted$.next(item);
  }

  get data() {
    return this._data;
  }

  get singleData() {
    return this._singleData;
  }

  constructor(@Inject('string') public endPoint: string) {
    this.factory = AppInjector.injector.get(Factory);
    this.helper = AppInjector.injector.get(Helper);
  }

  initialise(emitData: boolean = true, params?: Params) {
    return this.factory
      .get(`${this.endPoint}/initialise`, { params })
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
  }

  all(emit = true, params?: Params): Observable<any> {
    return this.factory
      .get(`${this.endPoint}/all`, { params })
      .pipe(
        tap(emit ? this.listResponseHandler() : this.onlyErrorResponseHandler())
      );
  }

  search(word: string, fields: string[]) {
    return this.factory
      .post(`${this.endPoint}/search`, { word, fields })
      .pipe(tap(this.listResponseHandler()));
  }

  get(options: { emitData: boolean; params?: Params } = { emitData: true }) {
    return this.factory
      .get(`${this.endPoint}`, { params: options?.params })
      .pipe(
        tap((response: ApiResponse<T>) => {
          if (options.emitData) {
            this.data = response.data;
          }

          this.paginationInfo = {
            total: response.total,
            itemsPerPage: response.per_page,
            currentPage: response.current_page,
          };
        }),
        map((response: ApiResponse<T>) => response.data)
      );
  }

  checkIfItemInData(item: any, libelleID = 'id') {
    return this.data
      .map((i) => i[libelleID as keyof T])
      .includes(item[libelleID]);
  }

  latest() {
    return this.factory.get(`${this.endPoint}/latest`);
  }

  download(fileID: number) {
    return this.factory.get(`file/${fileID}/download`);
  }

  store(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response.data;
          this.unshiftItemInData(response.data);
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }

  show(id: string, emitData = true) {
    return this.factory.get(`${this.endPoint}/${id}`).pipe(
      tap({
        next: (single) => {
          if (emitData) this.singleData = single;
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  setFieldInSingleData(field: keyof T, value: T[keyof T]) {
    if (this._singleData) {
      //@ts-expect-error
      this._singleData[field] = value;
      this.singleData$.next(this._singleData);
      return;
    }

    throw new Error('Donnée invalide');
  }

  setFieldInRowData(index: number, field: string, value: any) {
    this._data[index][field as keyof T] = value;
    this.data$.next(this._data);
  }

  update(id: string, data: {}) {
    return this.factory.put(`${this.endPoint}/${id}`, data).pipe(
      tap({
        next: (response) => {
          this.updateItemInData(id, response);
          this.lastItemEdited$.next(response);

          if (this._singleData) {
            this.singleData = response;
          }
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  delete(id: string) {
    return this.factory.delete(`${this.endPoint}/${id}`).pipe(
      tap({
        next: () => {
          this.deleteItemInData(id);
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  pushItemInData(item: T | T[]) {
    this.helper.arrayObject.append(this._data, item);
    this.data$.next(this._data);
  }

  unshiftItemInData(item: T | T[]) {
    this.helper.arrayObject.prepend(this._data, item);
    this.data$.next(this._data);
  }

  deleteItemInData(id: string, libelleID: string = 'id') {
    this._data = this._data.filter((item) => {
      return (item[libelleID as keyof T] as unknown as string) != id;
    });

    this.data$.next(this._data);
  }

  findItemInDataByID(id: string, libelleID: string = 'id') {
    return this._data.find(
      (item) => (item[libelleID as keyof T] as unknown as string) == id
    );
  }

  findIndexItemInDataByID(id: string, libelleID: string = 'id') {
    return this._data.findIndex((element) => {
      return (element[libelleID as keyof T] as unknown as string) == id;
    });
  }

  updateItemInData(id: string, data: any) {
    if (this._data.length) {
      const index = this.findIndexItemInDataByID(id);
      this._data[index] = data;
      this.data$.next(this._data);
    }
  }

  errorResponseHandler(error: HttpErrorResponse) {
    const errorMessage = error?.error?.message;

    if (error.status == 403) {
      this.helper.navigation.navigate(['not-found']);
    }
    this.helper.notification.toastDanger(errorMessage, true);
    // this.data = [];
  }

  listResponseHandler = () => {
    return {
      next: (data: any) => (this.data = data.data),
      error: (error: any) => this.errorResponseHandler(error),
    };
  };

  emitSingleData() {
    this.singleData$.next(this._singleData);
  }

  emitData(): void {
    this.data$.next(this._data);
  }
  onlyErrorResponseHandler = () => {
    return {
      error: (error: any) => this.errorResponseHandler(error),
    };
  };
}
