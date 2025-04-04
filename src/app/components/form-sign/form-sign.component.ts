import { CommonModule } from '@angular/common';
import { Component, input, NgModule} from '@angular/core';
import { LucideAngularModule, MoveRight, Eye, EyeOff, Check, X } from 'lucide-angular';
import { FormsModule } from '@angular/forms'; 
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-sign',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule, CustomButtonComponent],
  templateUrl: './form-sign.component.html',
  styleUrl: './form-sign.component.css'
})
export class FormSignComponent{
  constructor(private router: Router, private readonly authService: AuthService) {}

readonly moveRight = MoveRight
readonly eye = Eye
readonly Eye = Eye
readonly check = Check
readonly x = X
readonly eyeOff = EyeOff

regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
email: string = ''
userPassword: string = ''
passwordConfirmation: string = ''
isSignIn = input<boolean>(true)
isShow = false
alertMessage: string = ""


userMocked = {
  email: 'test@gmail.com',
  password: "*123Azerty"
}

/**
 * Inscription: Check si le mot de passe et le mot de passe de confirmation son strictement égaux et valide
 * @returns boolean
 */
isPasswordValid(): any {
  if ((this.regexPassword.test(this.passwordConfirmation) && this.userPassword === this.passwordConfirmation)) {
    console.log("good");
  }
}

/**
 * Toggle pour voir ou cacher le mot de passe
 * Valeur initial: false
 * @returns boolean
 */
showPassword() {
  this.isShow = !this.isShow
}

/**
 * Connection: Check si le mot de passe et le mot de passe de confirmation son strictement égaux
 * Si true, retourne le message d'indication
 */
CheckPasswordConfirmation() {
  if(this.regexPassword.test(this.userPassword) && this.regexEmail.test(this.email) && this.email === this.userMocked.email && this.userPassword === this.userMocked.password) {
    return this.router.navigate(['/home']);
  }
    return this.alertMessage = "L'email ou le mot de passe est incorrecte."
}

/**
 * Inscription: Check si le mot de passe contient 1 minuscule
 */
hasLowerCase(password: string): boolean {
  return /[a-z]/.test(password);
}

/**
 * Inscription: Check si le mot de passe contient 1 majuscule
 */
hasUpperCase(password: string): boolean {
  return /[A-Z]/.test(password);
}

/**
 * Inscription: Check si le mot de passe contient 1 caractère special
 */
hasSpecialCharacter(password: string): boolean {
  return /[^a-zA-Z0-9]/.test(password);
}

/**
 * Inscription: Check si le mot de passe contient 1 chiffre
 */
hasNumberCharacter(password: string): boolean {
  return /[0-9]/.test(password);
}

signUp () {
  this.authService.signUp(this.email, this.userPassword)
}

signIn () {
  this.authService.signIn(this.email, this.userPassword)
}
}

