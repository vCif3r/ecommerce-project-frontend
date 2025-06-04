import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { IProduct } from '../../core/models/product.model';
import { ICategory } from '../../core/models/category.model';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-products-category',
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './products-category.component.html',
  styleUrl: './products-category.component.css'
})
export class ProductsCategoryComponent {
  titleService = inject(Title);

  productService = inject(ProductService);
  categoryService = inject(CategoryService);

  route = inject(ActivatedRoute);

  loadingProducts = signal<boolean>(true);
  products = signal<IProduct[]>([]);

  loadingCategory = signal<boolean>(true);
  category = signal<ICategory>({} as ICategory);

  constructor() {
    this.route.params.subscribe(params => {
      const idCategory = Number(params['idCategory']);
      if (idCategory) {
        this.loadData(idCategory);
      }
    });
  }

  loadData(id: number){
    this.productService.findProductsByCategoryId(id).subscribe(products => {
      this.loadingProducts.set(false);
      this.products.set(products);
    })

    this.categoryService.findCategoryById(id).subscribe(category => {
      this.loadingCategory.set(false);
      this.category.set(category);
      this.titleService.setTitle(category.name);
    })
  }

  
}
