import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private fb: FormBuilder) {}

  createFormChildren(): FormGroup {
    return this.fb.group({
      children_name: ['', Validators.required],
      children_age: [null, [Validators.required, Validators.min(0)]],
    });
  }
  createFormDeceased(): FormGroup {
    return this.fb.group({
      deceased_name: ['', Validators.required],
      deceased_age: [null, [Validators.required, Validators.min(0)]],
      deceased_is_animal: [false],
      deceased_animal_type: [[''], Validators.required],
    });
  }
  createFormAnimal(): FormGroup {
    return this.fb.group({
      favorite_animal: [[''], Validators.required],
      is_pet: [false],
      pet_type: [[''], Validators.required],
      pet_name: [null],
    });
  }
  createFormNotion(): FormGroup {
    return this.fb.group({
      is_paradise: [false],
      is_added_white_paper: [false],
      is_custom_para: [false],
      is_religion: [false],
      religion_type: [[''], Validators.required],
      custom_para: [null],
    });
  }
}
