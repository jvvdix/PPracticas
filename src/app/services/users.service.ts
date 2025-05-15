import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs';

import { UserData } from '../models/userdata';
import { environment } from '../environments/environment';
import { MockUsersService } from './mock-users.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string;
  private useMockData: boolean;

  constructor(private http: HttpClient, private mockService: MockUsersService) {
    this.baseUrl = environment.apiUrl;
    this.useMockData = environment.useMockData;

    console.log(
      `UsersService initialized with ${
        this.useMockData ? 'MOCK' : 'REAL'
      } data source`
    );
  }

  // all users
  getUsers(): Observable<UserData[]> {
    if (this.useMockData) {
      console.log('Using mock data for getUsers');
      return this.mockService.getUsers();
    }

    return this.http.get<UserData[]>(`${this.baseUrl}/users`).pipe(
      tap((users) => {
        // Corregido 'user' a 'users' para el parámetro
        console.log('Fetched users from API:', users);
      }),
      catchError(this.handleError<UserData[]>('getUsers', []))
    );
  }

  //  only one user with id
  getUserById(id: string): Observable<UserData> {
    // Corregido el tipo de id
    if (this.useMockData) {
      console.log('Using mock data for getUserById');
      return this.mockService.getUserById(id);
    }

    return this.http.get<UserData>(`${this.baseUrl}/users/${id}`).pipe(
      tap((user) => {
        console.log(`Fetched user from API with id: ${id}`); // Corregida la interpolación de string
      }),
      catchError(this.handleError<UserData>('getUserById'))
    );
  }

  // new user
  createUser(user: UserData): Observable<UserData> {
    if (this.useMockData) {
      console.log('Using mock data for createUser');
      return this.mockService.createUser(user);
    }

    return this.http.post<UserData>(`${this.baseUrl}/users`, user).pipe(
      tap((newUser) => {
        console.log('Created user in API:', newUser);
      }),
      catchError(this.handleError<UserData>('createUser'))
    );
  }

  // update user
  updateUser(user: UserData): Observable<UserData> {
    if (this.useMockData) {
      console.log('Using mock data for updateUser');
      return this.mockService.updateUser(user);
    }

    return this.http
      .put<UserData>(`${this.baseUrl}/users/${user.id}`, user)
      .pipe(
        tap((updatedUser) => {
          console.log('Updated user in API:', updatedUser);
        }),
        catchError(this.handleError<UserData>('updateUser'))
      );
  }

  // delete user
  deleteUser(id: number): Observable<any> {
    if (this.useMockData) {
      console.log('Using mock data for deleteUser');
      return this.mockService.deleteUser(id.toString());
    }

    return this.http.delete(`${this.baseUrl}/users/${id}`).pipe(
      tap(() => {
        console.log(`Deleted user with id: ${id}`);
      }),
      catchError(this.handleError('deleteUser'))
    );
  }

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      // Para modo desarrollo, podemos registrar el error en la consola
      if (!environment.production) {
        console.error(error);
      }

      // Devuelve un resultado vacío para que la aplicación siga funcionando
      return of(result as T);
    };
  }
}
