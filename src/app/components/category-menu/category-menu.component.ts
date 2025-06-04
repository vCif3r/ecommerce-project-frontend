import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { ICategory } from '../../core/models/category.model';

@Component({
  selector: 'app-category-menu',
  imports: [CommonModule, RouterLink],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.css'
})
export class CategoryMenuComponent {
  private categoryService = inject(CategoryService);
  
  // Estados reactivos con signals
  categories = signal<ICategory[]>([]);
  isMenuOpen = signal(false);
  isLoading = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(open => !open);
    if (this.isMenuOpen() && this.categories().length === 0) {
      this.loadCategories();
    }
  }

  loadCategories() {
    this.isLoading.set(true);
    this.categoryService.getCategoriesTree().subscribe(data => {
      this.isLoading.set(false);
      this.categories.set(data);
    })
  }
}
