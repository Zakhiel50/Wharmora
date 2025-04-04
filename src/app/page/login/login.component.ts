import { Component, input } from '@angular/core';
import { FormSignComponent } from '../../components/form-sign/form-sign.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormSignComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isSignIn = true 
changeSign() {
   return this.isSignIn = !this.isSignIn
}

}
