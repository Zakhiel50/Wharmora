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

  @Input() label: string = 'Button';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color?: 'primary' | 'secondary';
  @Input() disabled?: "false" | 'true' | 'string' | undefined; 
  @Input() iconPosition?: 'left' | 'right'; 


  @Output() onClick = new EventEmitter<void>(); 


  handleClick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
