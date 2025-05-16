import { Component } from '@angular/core';
import { FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { ManageDataService } from '../../services/manage-data.service';
import { Router } from '@angular/router';
import { Data } from '../../../utils/models/data.type';
import { single } from 'rxjs';
import supabase from '../../../utils/supabase.init'

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe],
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
    { label: 'Tortue', value: 'tortue' },
    { label: 'Cheval', value: 'cheval' },
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

 async submit() {
  this.dataService.saveData({
    child: this.formChild,
    deceased: this.formDeceased,
    animal: this.formAnimal,
    notion: this.formNotion
  });

const { data: user, error: userError } = await supabase.auth.getUser();

if (userError || !user.user) {
  throw new Error('Utilisateur non authentifié');
}

const userId = user.user.id;

  const formData = {
    user_id: userId,
    children_name: this.formChild.get('children_name')!.value,
    children_age: this.formChild.get('children_age')!.value,
    deceased_name: this.formDeceased.get('deceased_name')!.value,
    deceased_age: this.formDeceased.get('deceased_age')!.value,
    deceased_is_animal: this.formDeceased.get('deceased_is_animal')!.value,
    deceased_animal_type: this.formDeceased.get('deceased_animal_type')!.value,
    favorite_animal: this.formAnimal.get('favorite_animal')!.value,
    is_pet: this.formAnimal.get('is_pet')!.value,
    pet_type: this.formAnimal.get('pet_type')!.value,
    pet_name: this.formAnimal.get('pet_name')!.value,
    is_paradise: this.formNotion.get('is_paradise')!.value,
    is_added_white_paper: this.formNotion.get('is_added_white_paper')!.value,
    is_custom_para: this.formNotion.get('is_custom_para')!.value,
    is_religion: this.formNotion.get('is_religion')!.value,
    religion_type: this.formNotion.get('religion_type')!.value,
    custom_para: this.formNotion.get('custom_para')!.value,
  };

  const { data, error } = await supabase
    .from('form')
    .insert([formData])
    .select();

  if (error) throw error.message;

  this.router.navigate(['generation']);
}

  
  
  
  
}