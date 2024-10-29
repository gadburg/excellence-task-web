import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Asegúrate de importar el AuthService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  projects: any[] = [];
  projectForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private projectService: ProjectService, private fb: FormBuilder, private authService: AuthService) {
    this.projectForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const usuarioId = this.authService.getUserId(); // Método para obtener el ID del usuario autenticado
    if (usuarioId) {
        this.loadProjects(usuarioId);
    } else {
        console.error('No se pudo obtener el ID del usuario');
        this.errorMessage = 'No se pudo obtener el ID del usuario';
    }
}

  loadProjects(usuarioId: number): void {
    this.projectService.getProjectsByUser(usuarioId).subscribe(
      (data) => {
        this.projects = data || [];
      },
      (error) => {
        this.errorMessage = 'Error al cargar los proyectos';
      }
    );
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const usuarioId = this.authService.getUserId(); // Obtener ID del usuario

      if (usuarioId !== null) {
        this.projectService.createProject(usuarioId, this.projectForm.value).subscribe(
          (response) => {
            this.loadProjects(usuarioId); // Actualiza la lista de proyectos
            this.projectForm.reset(); // Resetea el formulario
          },
          (error) => {
            this.errorMessage = 'Error al crear el proyecto';
          }
        );
      } else {
        this.errorMessage = 'Error: No se pudo obtener el ID del usuario';
      }
    }
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(
      () => {
        const usuarioId = this.authService.getUserId(); // Obtener ID del usuario
        if (usuarioId !== null) {
          this.loadProjects(usuarioId); // Vuelve a cargar la lista de proyectos
        } else {
          this.errorMessage = 'Error: No se pudo obtener el ID del usuario para actualizar la lista de proyectos';
        }
      },
      (error) => {
        this.errorMessage = 'Error al eliminar el proyecto';
      }
    );
  }
}

