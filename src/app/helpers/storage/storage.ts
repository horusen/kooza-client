import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  public getAccessToken(): any {
    return JSON.parse(localStorage.getItem('access_token')!);
  }

  get<T extends any>(key: string): T | null {
    return JSON.parse(localStorage.getItem(key)!) as T;
  }

  set<T extends any>(key: string, element: T): void {
    localStorage.setItem(key, JSON.stringify(element));
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem('user')!);
  }

  public setUserField(field: string, value: any) {
    localStorage.setItem(
      'user',
      JSON.stringify({ ...this.getUser(), [field]: value })
    );
  }

  getStructures() {
    return JSON.parse(localStorage.getItem('structures')!);
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
