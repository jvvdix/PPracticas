import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { PermisoData } from '../models/permiso.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermisoService {
  private apiUrl = 'https://registerapp.up.railway.app/api';
  private router = inject(Router);

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  //  todos los permisos
  getAllPermisos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/permissions`, {
      headers: this.getAuthHeaders(),
    });
  }

  //para coger el token y usarlo en las peticiones
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    console.log('Token usado en petición:', token); // TEMPORAL borrar luegoo que es 0 seguro
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
