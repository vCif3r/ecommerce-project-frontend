import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  private currentId = 0;

  getToasts() {
    return this.toasts.asReadonly();
  }

  show(message: string, type: ToastType = 'info', duration: number = 5000) {
    const id = this.currentId++;
    const newToast: Toast = { id, message, type, duration };
    
    this.toasts.update(toasts => [...toasts, newToast]);
    
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  dismiss(id: number) {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  // Métodos rápidos para tipos comunes
  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }
}