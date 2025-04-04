import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {
  private data: Record<string, any> = {};

  constructor() {}
  
  saveData(data: any): void {
    Object.keys(data).forEach(key => {
      const formGroup = data[key];
      if (formGroup && formGroup.controls) {
        this.data[key] = formGroup.value;
      }
    });
  }
  
  
  

  loadData() {
    if (this.data) {
      return this.data
    }
    return null
  }
}
