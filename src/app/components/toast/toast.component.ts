import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastService, ToastType } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule,],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  toastService = inject(ToastService);

  getToastClass(type: ToastType): string {
    const baseClass = 'border-l-4';
    switch (type) {
      case 'success': return `${baseClass} border-green-500 bg-green-50`;
      case 'error': return `${baseClass} border-red-500 bg-red-50`;
      case 'warning': return `${baseClass} border-yellow-500 bg-yellow-50`;
      case 'info': return `${baseClass} border-blue-500 bg-blue-50`;
      default: return `${baseClass} border-gray-500 bg-gray-50`;
    }
  }

  getTextClass(type: ToastType): string {
    switch (type) {
      case 'success': return 'text-green-800';
      case 'error': return 'text-red-800';
      case 'warning': return 'text-yellow-800';
      case 'info': return 'text-blue-800';
      default: return 'text-gray-800';
    }
  }
}
