import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  categoryService = inject(CategoryService);

  categories = toSignal(this.categoryService.findAll());
}
