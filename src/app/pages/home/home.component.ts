import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CarouselProductsComponent } from '../../components/carousel-products/carousel-products.component';
import { ProductService } from '../../core/services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, CarouselProductsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  carouselItems = [
    {
      img: "banner1.jpg"
    },
    {
      img: "banner2.jpg"
    },
    {
      img: "banner1.jpg"
    }
  ]

  slideConfigDestacados = {
    slidesToShow: 6,
    slidesToScroll: 6,
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

  productService = inject(ProductService);

  recientes = toSignal(this.productService.findRecentProducts(), { initialValue: []});

  
}
