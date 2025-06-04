import { Component, inject, input } from '@angular/core';
import { IProduct } from '../../core/models/product.model';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart-item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  product = input<IProduct>()
  cartService = inject(CartService);
  addToCart() {
    this.cartService.addItem(this.product()!);
  }
}
