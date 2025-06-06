import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { RoleData } from '../models/role.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'https://registerapp.up.railway.app/api';
  private router = inject(Router);

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  //  todos los roles
  getAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`, {
      headers: this.getAuthHeaders(),
    });
  }

  //  rol por ID
  getRoleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  //  nuevo rol
  createRole(role: any): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('Authentication token not found.'));
    }

    const params = new URLSearchParams({
      id: '0', // si el backend lo requiere (si no, puedes quitarlo)
      name: role.name,
      description: role.description,
    });

    const url = `${this.apiUrl}/roles?${params.toString()}`;
    console.log('Create role URL:', url);

    return this.http.put(url, null, { headers }).pipe(
      tap((newRole) => console.log('Role created:', newRole)),
      catchError((error) => {
        console.error('Error creating role:', error);
        return throwError(() => error);
      })
    );
  }

  // update un rol
  updateRole(id: number, updateRole: any): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('Authentication token not found.'));
    }

    const rolePayload = {
      //el payload es el cuerpo  que se envia en la peticion http
      id: id,
      name: updateRole.name,
      description: updateRole.description,
    };

    const url = `${this.apiUrl}/roles/${id}`;
    console.log('Update role URL:', url);
    console.log('Update role payload:', rolePayload);

    return this.http.put(url, rolePayload, { headers }).pipe(
      tap((updatedRole) => console.log('Role updated:', updatedRole)),
      catchError((error) => {
        console.error('Error updating role:', error);
        return throwError(() => error);
      })
    );
  }

  //borrar rol
  deleteRole(id: number): Observable<any> {
    const url = `${this.apiUrl}/roles/${id}?id=${id}`;
    const headers = this.getAuthHeaders();

    console.log('Deleting role with ID:', id);
    console.log('DELETE URL:', url);
    console.log('Auth Headers:', headers);

    return this.http.delete(url, { headers }).pipe(
      tap(() => console.log(` Role deleted with id=${id}`)),
      catchError((error) => {
        console.error(' Error deleting role:', error);
        return throwError(() => error);
      })
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    console.log('Token usado en petición:', token); // TEMPORAL borrar luegoo!!!!!
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
