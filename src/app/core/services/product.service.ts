import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';
import { environment } from '../../../environments/environment';

interface ProductResponse {
  data: IProduct[],
  meta: {
    total: number;
    page: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  findAll(): Observable<ProductResponse>{
    return this.http.get<ProductResponse>(`${this.apiUrl}/products`);
  }

  findRecentProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${this.apiUrl}/products/recent`)
  }

  findById(id: number): Observable<IProduct>{
    return this.http.get<IProduct>(`${this.apiUrl}/products/${id}`);
  }

  findProductsByCategoryId(idCategory: number): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${this.apiUrl}/products/category/${idCategory}`)
  }

  searchProduct(query: string): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${this.apiUrl}/products/search?query=${query}`)
  }

  getRecommendations(id: number): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${this.apiUrl}/products/${id}/recommendations`)
  }
}
