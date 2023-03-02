import { NgxPicaService } from '@digitalascetic/ngx-pica';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FileHandler } from './file-handler';
import { Helper } from '../helper/helper';

@Injectable({
  providedIn: 'root',
})
export class ImageHandlerService extends FileHandler {
  public acceptedImageExtension = ['jpg', 'png', 'jpeg', 'PNG', 'JPG', 'JPEG'];

  constructor(
    private _ngxPicaService: NgxPicaService,
    private _helper: Helper
  ) {
    super(_helper);
  }

  checkExtension(extension: string): boolean {
    return this._checkExtension(this.acceptedImageExtension, extension);
  }

  // Check if an image has correct extension and correct size
  checkImage(file: File): boolean {
    return this.checkFile(file, this.acceptedImageExtension);
  }

  // Allow to compress image by 75%
  compressImage(file: File, compressionPercentage: number = 75) {
    // compress image
    let size = (file.size * compressionPercentage) / 100;
    this._ngxPicaService.compressImage(file, size);
    return file;
  }

  resizeImage(
    file: File,
    width: number = 1200,
    height: number = 800
  ): Observable<File> {
    return this._ngxPicaService.resizeImage(file, width, height);
  }
}
