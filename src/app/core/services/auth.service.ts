import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthResponse, IUser, LoginRequest, RegisterRequest } from '../models/user.model';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
   private apiUrl = environment.apiUrl;
  private router = inject(Router);

  private _isAuthenticated = signal(false);

 
  // Exponer las signals como readonly
  isAuthenticated = this._isAuthenticated.asReadonly();
  
  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this._isAuthenticated.set(true);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        console.log('Login response:', response);
        console.log('user response:', response.user);
        this.setSession(response)
        this._isAuthenticated.set(true);
      })
    );
  }

  register(userData: RegisterRequest): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/auth/register`, userData);
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', JSON.stringify(authResult.user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): IUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

}