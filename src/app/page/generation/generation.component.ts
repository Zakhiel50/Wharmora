import html2canvas from 'html2canvas';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ManageDataService } from '../../services/manage-data.service';
import { Data } from '../../../utils/models/data.type';
import supabase from '../../../utils/supabase.init';
import jsPDF from 'jspdf';
import { User } from '@supabase/supabase-js';
import { LoaderComponent } from '../../components/loader/loader.component';
import { Router } from '@angular/router';

type UserData = {
  children_name: string,
  children_age: number,
  deceased_name: string,
  deceased_age: number,
  deceased_is_animal: boolean,
  deceased_animal_type: string | null,
  favorite_animal: string,
  is_pet: boolean,
  pet_type: string | null,
  pet_name: string | null,
  is_paradise: boolean,
  is_added_white_paper: boolean,
  is_custom_para: boolean,
  is_religion: boolean,
  religion_type: string | null,
  custom_para: string | null,
}
@Component({
  selector: 'app-generation',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent {

  userData: UserData | undefined
  constructor(private dataService: ManageDataService, private router: Router) { }

  ngOnInit(): void {
    //const data = this.dataService.loadData();
    this.fetchData()
    setTimeout(() => {
      this.router.navigate(['payment']);
    }, 5000)
  }

  fetchData = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      throw new Error('Utilisateur non authentifié');
    }
    const userId = userData.user.id;
    const { data, error } = await supabase
      .from('form')
      .select(`
    children_name,
    children_age,
    deceased_name,
    deceased_age,
    deceased_is_animal,
    deceased_animal_type,
    favorite_animal,
    is_pet,
    pet_type,
    pet_name,
    is_paradise,
    is_added_white_paper,
    is_custom_para,
    is_religion,
    religion_type,
    custom_para
  `)
      .eq('user_id', userId); // filtre sur l'utilisateur connecté
    if (error) {
      console.error('Erreur Supabase:', error.message);
      return;
    }
    if (data) {
      this.userData = data[0]
    }
  }

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  generatePDF() {
    const DATA = this.pdfContent.nativeElement;

    html2canvas(this.pdfContent.nativeElement, {
      useCORS: true,
      allowTaint: false,
      scale: 2
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Crée le PDF en mode paysage
      const pdf = new jsPDF('l', 'mm', 'a3');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgRatio = imgProps.width / imgProps.height;
      const pdfRatio = pdfWidth / pdfHeight;

      let width = pdfWidth;
      let height = pdfHeight;

      // Adapter le contenu à la page tout en gardant les proportions
      if (imgRatio > pdfRatio) {
        height = width / imgRatio;
      } else {
        width = height * imgRatio;
      }

      const x = (pdfWidth - width) / 2;
      const y = (pdfHeight - height) / 2;

      pdf.addImage(imgData, 'PNG', x, y, width, height);
      pdf.save('document-landscape.pdf');
    });

  }

}
