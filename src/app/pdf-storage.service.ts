// pdf-storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PdfStorageService {
  pdfBlob?: Blob | null;

  setPdf(blob: Blob) {
    this.pdfBlob = blob;
    
  }

  getPdf(): Blob | null {
    if (this.pdfBlob) return this.pdfBlob;
    return null
  }
}
