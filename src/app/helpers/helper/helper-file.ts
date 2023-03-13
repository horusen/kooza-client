import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperFile {
  checkExtension(filename: string, extension: any): boolean {
    if (filename.match(extension + '$')) {
      return true;
    }
    return false;
  }

  checkExtensions(filename: string, extensions: string[]): boolean {
    for (let extension of extensions) {
      if (this.checkExtension(filename, extension)) return true;
    }
    return false;
  }
}
