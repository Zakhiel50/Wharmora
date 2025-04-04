import { Component } from '@angular/core';
import { FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { ManageDataService } from '../../services/manage-data.service';
import { Router } from '@angular/router';
import { Data } from '../../../utils/models/data.type';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  formChild: FormGroup;
  formDeceased: FormGroup;
  formAnimal: FormGroup;
  formNotion: FormGroup;
  step = 0;

  isDeseacedAnimal = false
  haveAnimal = false
  isReligion = false

  steps = [
    'Enfant',
    'Défunt',
    'Animal de compagnie',
    'Croyances',
    'Résumé'
  ];

  animalOptions = [
    { label: 'Chat', value: 'chat' },
    { label: 'Chien', value: 'chien' },
    { label: 'Oiseau', value: 'oiseau' },
    { label: 'Lapin', value: 'lapin' },
    { label: 'Poisson', value: 'poisson' },
  ];

  ReligionOptions = [
    { label: 'Chistianisme', value: 'chistianisme' },
    { label: 'Islam', value: 'islam' },
    { label: 'Bhoudisme', value: 'bhoudisme' },
  ];

  constructor(
    private formBuilderService: FormBuilderService,
    private dataService: ManageDataService,
    private router: Router
  ) {
    this.formChild = this.formBuilderService.createFormChildren();
    this.formDeceased = this.formBuilderService.createFormDeceased();
    this.formAnimal = this.formBuilderService.createFormAnimal();
    this.formNotion = this.formBuilderService.createFormNotion();
  }

  isChecked(form: FormGroup, controlName: string): boolean {
    return form.get(controlName)?.value === true;

  }

  nextStep(form: FormGroup): void {
    if (this.step < this.steps.length - 1) {
      this.step++;
    }
    console.log(form.value);
    this.dataService.saveData(form);
  }

  prevStep(): void {
    if (this.step > 0) {
      this.step--;
    }
  }

  getCurrentForm(): FormGroup {
    switch (this.step) {
      case 0: return this.formChild;
      case 1: return this.formDeceased;
      case 2: return this.formAnimal;
      case 3: return this.formNotion;
      default: return this.formChild;
    }
  }

  submit() {
    this.router.navigate(['generation']);
    this.dataService.saveData({
      child: this.formChild,
      deceased: this.formDeceased,
      animal: this.formAnimal,
      notion: this.formNotion
    });
  }
  
  
  
  
}