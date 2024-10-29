import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // El usuario está autenticado, permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige a la página de login
      return false; // El usuario no está autenticado, bloquea el acceso
    }
  }
}
