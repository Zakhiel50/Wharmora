import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [NgClass, LucideAngularModule, CommonModule],
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomButtonComponent {

  @Input() label: string = 'Button'; // Texte par défaut
  @Input() size: 'small' | 'medium' | 'large' = 'medium'; // Taille du bouton
  @Input() color?: 'primary' | 'secondary'; // Couleur (style custom)
  @Input() disabled?: "false" | 'true' | 'string' | undefined; // Désactiver le bouton
  @Input() iconPosition?: 'left' | 'right'; // Position de l'icône


  @Output() onClick = new EventEmitter<void>(); // Événement pour cliquer sur le bouton


  handleClick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
