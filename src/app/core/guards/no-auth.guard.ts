import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return true; // Permite acceso si NO está autenticado
  } else {
    // Redirige al home u otra página si ya está autenticado
    router.navigate(['/']);
    return false;
  }
};