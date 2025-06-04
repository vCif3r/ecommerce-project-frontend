import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart-item.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartService = inject(CartService);
  private fb = inject(FormBuilder);
  //private orderService = inject(OrderService);
  private router = inject(Router);
  
  isProcessing = signal(false);
  
  checkoutForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: [''],
    zipCode: [''],
    phone: [''],
    paymentMethod: ['credit-card']
  });

  placeOrder() {
    if (this.checkoutForm.invalid) return;
    
    this.isProcessing.set(true);
    
    const orderData = {
      ...this.checkoutForm.value,
      items: this.cartService.getItems(),
      total: this.cartService.subtotal(),
      status: 'pending'
    };
    
    
  }
}
