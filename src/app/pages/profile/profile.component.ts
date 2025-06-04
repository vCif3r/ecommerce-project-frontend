import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  authService = inject(AuthService);

  user: IUser | null = this.authService.getUser();

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('es-ES', options);
  }
  
}
