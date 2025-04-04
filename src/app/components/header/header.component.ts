import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}
  currentSection: string = 'login';  // Définir la section active par défaut
  currentRoute = '';



  
  setSection(section: string): void {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', ''); // Ex: 'home', 'form', etc.
    });
    this.currentSection = section;
    this.router.navigate([section]);
    this.currentRoute === section;
  }
}
