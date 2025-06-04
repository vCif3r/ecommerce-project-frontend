import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ICategory } from '../models/category.model';
import { environment } from '../../../environments/environment';

interface CategoryResponse {
  data: ICategory[],
  meta: any;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private http = inject(HttpClient);
   private apiUrl = environment.apiUrl;

  findAll(): Observable<CategoryResponse>{
    return this.http.get<CategoryResponse>(`${this.apiUrl}/categories`)
  }

  findCategoryById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiUrl}/categories/${id}`)
  }

  getCategoriesTree(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiUrl}/categories/list/tree`)
  }

}
