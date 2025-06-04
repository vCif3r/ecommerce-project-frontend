import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest } from '../../core/models/user.model';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
authService = inject(AuthService);
  registerForm: FormGroup;
  router = inject(Router)
  errorMessage = signal<string | null>(null);
  titleService = inject(Title);
  toastService = inject(ToastService);
  
  constructor(
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.titleService.setTitle('Registro');
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData: RegisterRequest = this.registerForm.value;
      
      this.authService.register(userData).subscribe({
        next: () => {
          this.toastService.success('Registro exitoso. Inicia sesión.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage.update(() => err.error?.error || 'Error al registrar. Por favor, inténtalo de nuevo.');
          console.error('Register error:', err);
        }
      });
    }
  }
}
