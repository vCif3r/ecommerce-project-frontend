import { computed, Injectable, signal } from "@angular/core";
import { CartItem } from "../models/cart-item.model";
import { IProduct } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class CartService {
 items = signal<CartItem[]>([]);

  // Señales computadas/computadas para el estado del carrito
  itemCount = computed(() => 
    this.items().reduce((total, item) => total + item.quantity, 0)
  );

  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  // Cargar carrito desde localStorage al inicializar
  constructor() {
    this.loadCart();
  }

  // Método para agregar un producto al carrito
  addItem(product: Omit<IProduct , 'description'|'stock'|'category'>, quantity: number = 1): void {
    const existingItem = this.items().find(item => item.id === product.id);

    if (existingItem) {
      // Si ya existe, actualizar la cantidad
      this.items.update(items =>
        items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Si no existe, agregar nuevo item
      this.items.update(items => [
        ...items,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0].imageUrl,
          quantity: quantity
        }
      ]);
    }

    this.saveCart();
  }

  // Eliminar un item del carrito
  removeItem(productId: number): void {
    this.items.update(items => items.filter(item => item.id !== productId));
    this.saveCart();
  }

  // Actualizar cantidad de un item específico
  updateQuantity(productId: number, newQuantity: number): void {
    if (newQuantity < 1) {
      this.removeItem(productId);
      return;
    }

    this.items.update(items =>
      items.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    this.saveCart();
  }

  // Obtener todos los items del carrito
  getItems(): CartItem[] {
    return this.items();
  }

  // Vaciar el carrito completamente
  clearCart(): void {
    this.items.set([]);
    localStorage.removeItem('cart');
  }

  // Cargar carrito desde localStorage
  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        if (Array.isArray(cart.items)) {
          this.items.set(cart.items);
        }
      } catch (e) {
        console.error('Error al cargar el carrito', e);
        localStorage.removeItem('cart');
      }
    }
  }

  // Guardar carrito en localStorage
  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify({
      items: this.items()
    }));
  }

  // Método para incrementar cantidad
  incrementQuantity(productId: number): void {
    this.items.update(items =>
      items.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    this.saveCart();
  }

  // Método para decrementar cantidad
  decrementQuantity(productId: number): void {
    this.items.update(items =>
      items.map(item =>
        item.id === productId
          ? { 
              ...item, 
              quantity: item.quantity > 1 ? item.quantity - 1 : 1 
            }
          : item
      )
    );
    this.saveCart();
  }

  // Verificar si un producto ya está en el carrito
  isInCart(productId: number): boolean {
    return this.items().some(item => item.id === productId);
  }

  // Obtener la cantidad de un producto específico en el carrito
  getProductQuantity(productId: number): number {
    const item = this.items().find(item => item.id === productId);
    return item ? item.quantity : 0;
  }
}