import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './components/layout/public-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            {
                path: 'login', 
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
                canActivate: [noAuthGuard],
            },
            { 
                path: 'register',
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
                canActivate: [noAuthGuard],
            },
            { 
                path: '', 
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
                title: 'Inicio'
            },
            {
                path: 'products/:id',
                loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
            },
            {
                path: 'products/category/:idCategory',
                loadComponent: () => import('./pages/products-category/products-category.component').then(m => m.ProductsCategoryComponent)
            },
            {
                path: 'cart',
                loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
                title: 'Carrito de Compras'
            },
            {
                path: 'checkout',
                loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
                title: 'Finalizar Compra'
            },
            {
                path: 'profile',
                loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
                title: 'Perfil de Usuario',
                canActivate: [authGuard] 
            }
        ]
    },
    { path: '**', redirectTo: '' }, // Redirigir a la página de inicio si la ruta no coincide
];
