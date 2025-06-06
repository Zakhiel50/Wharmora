// pdf-storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PdfStorageService {
  pdfBlob: Blob | null = null;

  setPdf(blob: Blob) {
    this.pdfBlob = blob;
  }

  getPdf(): Blob | null {
    return this.pdfBlob;
  }
}
