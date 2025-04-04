import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' 
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return from(this.authService.getUserProfile()).pipe(

      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }),
      catchError(error => {
        console.error('Erreur lors de la vérification de l’utilisateur:', error);
        this.router.navigate(['login']);
        return of(false);
      })
    );
  }
}
