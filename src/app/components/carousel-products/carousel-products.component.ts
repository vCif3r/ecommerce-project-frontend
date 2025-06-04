import { Component, input, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { IProduct } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carousel-products',
  imports: [ProductCardComponent, CommonModule, SlickCarouselModule ],
  templateUrl: './carousel-products.component.html',
  styleUrl: './carousel-products.component.css',
})
export class CarouselProductsComponent implements OnInit {
  products = input<IProduct[]>()
  title = input<string>()
  slideConfig = input({})

  ngOnInit(): void {

  }
  
}
