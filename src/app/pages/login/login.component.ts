import { ToastService } from './../../core/services/toast.service';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/models/user.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  loginForm: FormGroup;
  router = inject(Router)
  titleService = inject(Title);
  toastService = inject(ToastService);

  constructor(
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.titleService.setTitle('Iniciar sesión');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginRequest = this.loginForm.value;
      
      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toastService.error('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }
}
