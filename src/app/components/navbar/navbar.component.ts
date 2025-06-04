import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CartService } from '../../core/services/cart-item.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SearchBarComponent, CommonModule, CategoryMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  
  mobileMenuOpen = signal(false);
  cartOpen = signal(false);
  userDropdownOpen = signal(false);

  toggleCart() {
    this.cartOpen.update(v => !v);
  }

  logout() {
    this.authService.logout();
    this.userDropdownOpen.set(false);
  }
}
