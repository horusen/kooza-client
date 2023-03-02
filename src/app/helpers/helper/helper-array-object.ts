import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class helperArrayObject {
  find(array: any[], id: number, libelleID: string = 'id') {
    return array.find((item) => item[libelleID] == id);
  }

  findIndex(array: any[], id: number, libelleID: string = 'id') {
    return array.findIndex((element) => {
      return element[libelleID] == id;
    });
  }

  delete(array: any[], idItem: number, libelleID: string = 'id') {
    return array.filter((item) => item[libelleID] != idItem);
  }

  search(data: any[], field: string, value: string) {
    return data.find((item) => item[field] == value);
  }

  extractField(data: any[], idField: string = 'id'): any[] {
    let returned: number[] = [];
    data.forEach((element) => {
      returned.push(element[idField]);
    });
    return returned;
  }

  append<T>(array: T[], element: T | T[]): void {
    if (element instanceof Array) {
      array.push(...element);
      return;
    }

    array.push(element);
    return;
  }

  prepend<T>(array: T[], element: T | T[]): void {
    if (element instanceof Array) {
      array.unshift(...element);
      return;
    }

    array.unshift(element);
    return;
  }
}
