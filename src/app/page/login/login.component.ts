import { environment } from './../../../environments/environment';
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

// signIn(): void {
//   this.authService.login('john@doe.fr', 'azerty').subscribe({
//     next: (res) => console.log('res : ', res),
//     error: (err) => console.error('error: Impossible de récupérer les informations de connections : ', err)
    
//   })
// }
}
