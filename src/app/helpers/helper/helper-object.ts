import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperObject {
  omitNullValue(obj: any) {
    let newObject: any = {};
    Object.keys(obj).forEach((key: string) => {
      if (obj[key] && obj[key] !== 'null') {
        newObject[key] = obj[key];
      }
    });

    return newObject;
  }

  serialize(object: {}) {
    return this.omitEmptyArrays(this.omitNullValue(object));
  }

  getKeys(object: Object): string[] {
    return Object.keys(object);
  }

  omitEmptyArrays(obj: any) {
    let newObject: any = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        if (obj[key] instanceof Array) {
          if (obj[key].length) newObject[key] = obj[key];
        } else newObject[key] = obj[key];
      }
    });

    return newObject;
  }

  omitField(obj: any, omitKeys: string[]): {} {
    if (Object.keys(obj).length) {
      return Object.keys(obj).reduce((result: any, key) => {
        if (!omitKeys.includes(key)) {
          result[key] = obj[key];
        }
        return result;
      }, {});
    }

    return {};
  }
}
