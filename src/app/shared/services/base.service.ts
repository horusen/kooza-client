import { AngularFireStorageReference } from './../../../../node_modules/@angular/fire/compat/storage/ref.d';
import { DocumentData } from './../../../../node_modules/@firebase/firestore-types/index.d';
import { Firestore } from './../../../../node_modules/@angular/fire/firestore/firestore.d';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { tap, map, finalize } from 'rxjs/operators';
import { from, ReplaySubject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { AppInjector } from './app-injector.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T extends DocumentData> {
  private _data: T[] = [];

  private _item: T | null = null;

  public data$ = new ReplaySubject<T[]>(1);
  public item$ = new ReplaySubject<T | null>(1);

  private collection: AngularFirestoreCollection;
  private firestore: AngularFirestore;
  private collectionName: string;
  public storage: AngularFireStorage;

  public get data(): T[] {
    return this._data;
  }

  public get item(): T | null {
    return this._item;
  }

  public set item(item: T | null) {
    this._item = item;
    this.item$.next(item);
  }

  public set data(data: T[]) {
    this._data = data;
    this.data$.next(this._data);
  }

  constructor(@Inject('collectionName') collectionName: string) {
    this.collectionName = collectionName;
    this.firestore = AppInjector.injector.get(AngularFirestore);
    this.storage = AppInjector.injector.get(AngularFireStorage);
    this.collection = this.firestore.collection(this.collectionName);
  }

  getAll() {
    return this.collection.valueChanges().pipe(
      tap((items) => {
        this.data = items as T[];
      })
    );
  }

  async create(element: T) {
    const filePath = `${this.collectionName}/${new Date().getTime()}_${
      element['name']
    }`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, element['image']);

    // observe percentage changes
    // get notified when the download URL is available
    await task.snapshotChanges().toPromise();
    let url = await fileRef.getDownloadURL().toPromise();
    return this.collection.add(
      Object.assign(element, { image: url, id: Date.now() })
    );
  }

  getSingle(id: string) {
    return this.firestore
      .doc(`this.collectionName/${id}`)
      .get()
      .pipe(
        tap((item) => {
          this.item = item as unknown as T;
        })
      );
  }

  delete(id: string) {
    return this.firestore.doc(`this.collectionName/${id}`).delete();
  }

  update(id: string, element: T) {
    return this.firestore
      .doc(`this.collectionName/${id}`)
      .update(Object.assign({}, element));
  }
}
