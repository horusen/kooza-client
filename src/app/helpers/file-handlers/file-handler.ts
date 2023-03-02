import { NgxPicaService } from '@digitalascetic/ngx-pica';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Helper } from '../helper/helper';

@Injectable({
  providedIn: 'root',
})
export abstract class FileHandler {
  constructor(protected helper: Helper) {}

  // Check if an image has correct extension and correct size
  checkFile(
    file: File,
    acceptedExtensions: string[],
    fileSize: number = 20480000000
  ) {
    // extract extension from file
    let fileExtension = this.getFileExtension(file);

    if (fileExtension) {
      // Check if extension accpeted
      if (acceptedExtensions.includes(fileExtension)) {
        // Check the size
        if (this.checkFileSize(file, fileSize)) {
          return true;
        } else {
          this.helper.notification.toastDanger('fichierTropVolumineux');
          return false;
        }
      } else {
        this.helper.notification.toastDanger('mauvaisFormatDeFichier');
        return false;
      }
    }

    throw new Error('File format has a problem');
  }

  _checkExtension(acceptedExtensions: string[], extension: string): boolean {
    return acceptedExtensions.includes(extension);
  }

  checkFileSize(file: File, size: number) {
    return file.size < size;
  }

  getFileExtension(file: File) {
    // extract extension from file
    return file.name.split('.').pop();
  }
}
