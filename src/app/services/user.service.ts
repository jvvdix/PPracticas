import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginModel, UserRegister } from '../models/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://registerapp.up.railway.app/api'; //la url base
  private router = inject(Router);

  constructor(private http: HttpClient) {}

  //para ver si el user esta loggeado y asegurar la seguridad de otros apartados de la web (se usa en authguard)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  //registro
  registerUser(obj: UserRegister): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, obj);
  }

  //login con htppparams
  onLogin(obj: LoginModel): Observable<any> {
    const params = new HttpParams()
      .set('email', obj.email)
      .set('password', obj.password);

    return this.http.post(`${this.apiUrl}/login`, null, {
      params,
      responseType: 'text',
    });
  }

  //cierre de sesion
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
    console.log('Logout completado');
  }

  //coger todos los users para la tabla
  getAllUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }

  //coger el usuario por id para el editar/eliminar
  getUserById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.get(`${this.apiUrl}/users/${id}`, { headers });
  }

  //coger el usuario q esta loggeado para el sidenav
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
