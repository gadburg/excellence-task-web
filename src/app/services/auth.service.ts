// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); // Estado inicial
  isLoggedIn$ = this.isAuthenticatedSubject.asObservable(); // Observable para que otros componentes puedan escuchar cambios

  constructor(private http: HttpClient, private router: Router) {}

  // Método para registrar un usuario
  register(nombre: string, contraseña: string, email: string): Observable<any> {
    const body = { nombre, contraseña, email, rol: 'USER' };
    return this.http.post<any>(`${this.apiUrl}/register`, body).pipe(
      catchError(err => {
        console.error('Error en el registro', err);
        return of(null);
      })
    );
  }

  // Método para iniciar sesión
  login(email: string, contraseña: string): Observable<any> {
    const body = { email, contraseña };
    return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
      catchError(err => {
        console.error('Error en el inicio de sesión', err);
        return of(null);
      })
    );
  }

  handleLogin(response: any): void {
    if (response && response.token) {
      localStorage.setItem('token', response.token);
      this.isAuthenticatedSubject.next(true); // Emitir que el usuario está autenticado
      console.log('Usuario autenticado');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false); // Emitir que el usuario no está autenticado
    this.router.navigate(['/login']);
    console.log('Usuario desconectado');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodifica el token y obtén el ID (esto dependerá de cómo estructuraste tu token)
      const payload = JSON.parse(atob(token.split('.')[1])); // Esto asume que el token es JWT
      return payload.id; // Asegúrate de que `id` es el campo correcto en tu token
    }
    return null;
  }

}
