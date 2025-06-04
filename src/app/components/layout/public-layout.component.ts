import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  template: `
    <!-- Navbar -->
    <app-navbar/>
    <!-- Content -->
    <main class="bg-gray-100">
      <router-outlet/>
    </main>
    <!-- Footer -->
    <app-footer/>
  `,
})
export class PublicLayoutComponent {

}
