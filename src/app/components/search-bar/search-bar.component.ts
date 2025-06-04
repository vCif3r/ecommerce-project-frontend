import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/models/product.model';
import { effect, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, RouterLink],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchQuery = signal<string>('');

  productService = inject(ProductService);

  productsResult = signal<IProduct[]>([]);

  constructor() {
    effect(() => {
      const query = this.searchQuery();
      if (query.length > 0) {
        this.productService.searchProduct(query).subscribe((products) => {
          this.productsResult.set(products);
        });
      } else if (query.length === 0) {
        this.productsResult.set([]);
      }
    });
  }

}
