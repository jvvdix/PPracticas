import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginModel, UserRegister } from '../models/user.model';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://registerapp.up.railway.app/api';
  private router = inject(Router);

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  registerUser(obj: UserRegister): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, obj);
  }

  onLogin(obj: LoginModel): Observable<any> {
    const params = new HttpParams()
      .set('email', obj.email)
      .set('password', obj.password);

    return this.http.post(`${this.apiUrl}/login`, null, {
      params,
      responseType: 'text',
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
    console.log('Logout completado');
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`, {
      headers: this.getAuthHeaders(),
    });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUser(id: number, updatedData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('Authentication token not found.'));
    }

    const userPayload = {
      username: updatedData.username,
      password: updatedData.password || '',
      email: updatedData.email,
      name: updatedData.name || '',
      lastName: updatedData.lastName || '',
      status: Boolean(updatedData.status),
    };

    const url = `${this.apiUrl}/users/${id}`;
    console.log('Update user URL:', url);
    console.log('Payload enviado:', userPayload);

    return this.http.put(url, userPayload, { headers }).pipe(
      tap((updatedUser) => {
        console.log('Usuario actualizado exitosamente:', updatedUser);
      }),
      catchError((error) => {
        console.error('Error actualizando usuario:', error);
        console.error('Error status:', error.status);
        console.error('Error response:', error.error);

        if (error.status === 400) {
          console.error(
            'Bad Request - Verificar que todos los campos requeridos estén presentes'
          );
          console.error('Payload enviado:', userPayload);
        } else if (error.status === 401) {
          console.error('Unauthorized - Token inválido o expirado');
          this.router.navigateByUrl('/login');
        } else if (error.status === 404) {
          console.error('Usuario no encontrado con ID:', id);
        }

        return throwError(() => error);
      })
    );
  }

  createUser(user: any): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('Authentication token not found.'));
    }

    console.log('Creating user with payload:', user);

    return this.http
      .post(`${this.apiUrl}/users`, user, {
        headers,
        observe: 'response',
      })
      .pipe(
        tap((response) => console.log('Usuario creado:', response.body)),

        catchError((error) => {
          console.error('Error creando usuario:', error);
          return throwError(() => error);
        })
      );
  }

  getRoles(): Observable<{ id: number; name: string; description: string }[]> {
    return this.http.get<{ id: number; name: string; description: string }[]>(
      `${this.apiUrl}/roles`,
      { headers: this.getAuthHeaders() }
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('No token found in localStorage');
      //si no hay token te redirige al login
      this.router.navigateByUrl('/login');
      throw new Error('No authentication token available');
    }

    console.log('Token usado en petición:', token); //no olvidar borrar!!!!!

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
}
