import { Injectable } from '@angular/core';
import { Helper } from '../helper/helper';
import { FileHandler } from './file-handler';

@Injectable({
  providedIn: 'root',
})
export class DocumentHandlerService extends FileHandler {
  public acceptedDocumentExtension = ['pdf', 'PDF'];

  constructor(private _helper: Helper) {
    super(_helper);
  }

  // Check if an image has correct extension and correct size
  checkDocument(file: File): boolean {
    return this.checkFile(file, this.acceptedDocumentExtension);
  }
}
