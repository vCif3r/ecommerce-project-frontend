import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselProductsComponent } from '../../components/carousel-products/carousel-products.component';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart-item.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  imports: [CarouselProductsComponent, CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  slideConfigRecom = {
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    dots: true,
    draggable: false,
    responsive: [
      {
        "breakpoint": 1400,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 4,
          "slidesToScroll": 4
        }
      },
      {
        "breakpoint": 1200,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 3,
          "slidesToScroll": 3
        }
      },
      {
        "breakpoint": 1024,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 2,
          "slidesToScroll": 2
        }
      },
      {
        "breakpoint": 700,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      },
    ]
  }

  titleService = inject(Title);

  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  product = signal<IProduct | null>(null);
  recommendedProducts = signal<IProduct[] | undefined>(undefined);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id) {
        this.loadProduct(Number(id));
      }
    });
  }

  imageSelected = signal<string | null>(null);

  // Método para cambiar la imagen principal del producto
  changeImage(imageUrl: string): void {
    this.imageSelected.set(imageUrl);
  }

  private loadProduct(id: number): void {
    this.productService.findById(id).subscribe(product => {
      this.product.set(product);
      this.imageSelected.set(product.images[0].imageUrl);
      this.titleService.setTitle(product.name);
    });

    this.productService.getRecommendations(id).subscribe(products => {
      this.recommendedProducts.set(products);
    });

    this.quantity = 1; // Opcional: resetear cantidad al cambiar producto
  }

  cartService = inject(CartService);

  quantity = 1;

  addToCart(): void {
    const product = this.product();
    if (!product) {
      return;
    }
    this.cartService.addItem(product, this.quantity);
  }

  incrementQuantity(): void {
    if(this.quantity >= 10) {
      return;
    }
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

}
