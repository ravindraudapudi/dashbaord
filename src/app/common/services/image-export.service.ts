import { Injectable } from '@angular/core';
import * as domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ImageExportService {

  constructor() { }

  public exportImageData(name: string, fileName: string , cb) {
      domtoimage.toBlob(document.getElementById(name), { filter: this.filter, quality: 0.95, bgcolor: 'white' })
      .then(function (blob) {
        saveAs(blob, fileName.trim());
        cb('file saved')
      });
  }

  filter(node) {
    return (node.tagName !== 'BUTTON' && node.tagName !== 'button');
  }
}