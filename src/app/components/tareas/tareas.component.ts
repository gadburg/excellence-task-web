import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas = [
    { id: 1, nombre: 'Tarea 1', descripcion: 'Descripción de la tarea 1', estado: 'Pendiente' },
    { id: 2, nombre: 'Tarea 2', descripcion: 'Descripción de la tarea 2', estado: 'En progreso' },
    { id: 3, nombre: 'Tarea 3', descripcion: 'Descripción de la tarea 3', estado: 'Completada' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  crearTarea() {
    // Lógica para crear una nueva tarea
    console.log('Nueva tarea');
  }

  verTarea(id: number) {
    // Lógica para ver una tarea específica
    console.log(`Ver tarea con ID: ${id}`);
  }
}
