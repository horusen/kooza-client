import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  public getAccessToken(): any {
    return localStorage.getItem('accessToken') &&
      localStorage.getItem('accessToken') != 'undefined'
      ? JSON.parse(localStorage.getItem('accessToken')!)
      : null;
  }

  get<T extends any>(key: string): T | null {
    return localStorage.getItem(key) && localStorage.getItem(key) != 'undefined'
      ? (JSON.parse(localStorage.getItem(key)!) as T)
      : null;
  }

  set<T extends any>(key: string, element: T): void {
    localStorage.setItem(key, JSON.stringify(element));
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }

  public getUser(): any {
    return localStorage.getItem('user') &&
      localStorage.getItem('user') != 'undefined'
      ? JSON.parse(localStorage.getItem('user')!)
      : null;
  }

  public setUserField(field: string, value: any) {
    localStorage.setItem(
      'user',
      JSON.stringify({ ...this.getUser(), [field]: value })
    );
  }

  public setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public save(token: any) {
    Object.keys(token).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(token[key]));
    });
  }

  public clear(): void {
    localStorage.clear();
  }
}
