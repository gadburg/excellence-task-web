import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password, email } = this.registerForm.value;

      this.authService.register(username, password, email).subscribe(response => {
        if (response) {
          this.successMessage = 'Registro exitoso. Redirigiendo al login...';
          setTimeout(() => this.router.navigate(['/login']), 3000); // Redirige al login después de 3 segundos
        } else {
          this.errorMessage = 'Error en el registro. Intenta de nuevo.';
        }
      });
    }
  }
}
