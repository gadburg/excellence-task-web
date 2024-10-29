// src/app/services/project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/proyectos';

  constructor(private http: HttpClient) {}

  // Método para obtener proyectos por usuario
  getProjectsByUser(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  // Método para crear un nuevo proyecto
  createProject(usuarioId: number, project: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    project.usuarioId = usuarioId; // Asegúrate de que el proyecto incluya el ID del usuario
    return this.http.post<any>(this.apiUrl, project, { headers }).pipe(
      catchError(err => {
        console.error('Error al crear el proyecto', err);
        return of(null);
      })
    );
  }

  // Método para eliminar un proyecto
  deleteProject(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(err => {
        console.error('Error al eliminar el proyecto', err);
        return of(null);
      })
    );
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
}
