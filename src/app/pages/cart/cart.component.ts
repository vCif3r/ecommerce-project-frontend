import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart-item.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
cartService = inject(CartService);

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
