import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { UserData } from '../models/userdata';

/**
 * This service provides mock user data for development and testing.
 * It simulates API responses with Observable patterns to match the real service.
 */
@Injectable({
  providedIn: 'root',
})
export class MockUsersService {
  // Mock users data
  private mockUsers: UserData[] = [
    {
      id: '1001',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Student',
      status: 'Active',
      photoUrl: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: '1002',
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Professor',
      status: 'Active',
      photoUrl: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: '1003',
      fullName: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      role: 'Admin',
      status: 'Active',
      photoUrl: 'https://i.pravatar.cc/150?img=8',
    },
    {
      id: '1004',
      fullName: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'Tutor',
      status: 'Pending',
      photoUrl: 'https://i.pravatar.cc/150?img=9',
    },
    {
      id: '1005',
      fullName: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      role: 'Student',
      status: 'Active',
      photoUrl: 'https://i.pravatar.cc/150?img=11',
    },
    {
      id: '1006',
      fullName: 'Sarah Taylor',
      email: 'sarah.taylor@example.com',
      role: 'Delegado',
      status: 'Pending',
      photoUrl: 'https://i.pravatar.cc/150?img=10',
    },
    {
      id: '1007',
      fullName: 'David Brown',
      email: 'david.brown@example.com',
      role: 'Professor',
      status: 'Active',
      photoUrl: 'https://i.pravatar.cc/150?img=12',
    },
    {
      id: '1008',
      fullName: 'Jennifer Garcia',
      email: 'jennifer.garcia@example.com',
      role: 'Student',
      status: 'Active',
      photoUrl: 'https://i.pravatar.cc/150?img=25',
    },
    {
      id: '1009',
      fullName: 'Thomas Martinez',
      email: 'thomas.martinez@example.com',
      role: 'Tutor',
      status: 'Active',
      photoUrl: 'https://i.pravatar.cc/150?img=15',
    },
    {
      id: '1010',
      fullName: 'Lisa Robinson',
      email: 'lisa.robinson@example.com',
      role: 'Student',
      status: 'Pending',
      photoUrl: 'https://i.pravatar.cc/150?img=23',
    },
  ];

  constructor() {}

  /**
   * Get all users
   * @returns Observable of UserData array with simulated network delay
   */
  getUsers(): Observable<UserData[]> {
    // Return a copy of mock data with a simulated network delay
    return of([...this.mockUsers]).pipe(delay(800));
  }

  /**
   * Get a user by ID
   * @param id User ID to find
   * @returns Observable of the found UserData or undefined
   */
  getUserById(id: string): Observable<UserData> {
    const user = this.mockUsers.find((user) => user.id === id);

    if (!user) {
      // Simulate a "not found" scenario
      return of({} as UserData).pipe(delay(500));
    }

    return of({ ...user }).pipe(delay(500));
  }

  /**
   * Create a new user
   * @param user User data to create
   * @returns Observable of the created UserData with new ID
   */
  createUser(user: UserData): Observable<UserData> {
    // Create a new user with a generated ID
    const newUser: UserData = {
      ...user,
      id: this.generateId(),
    };

    this.mockUsers.push(newUser);
    return of({ ...newUser }).pipe(delay(800));
  }

  /**
   * Update an existing user
   * @param user User data to update
   * @returns Observable of the updated UserData
   */
  updateUser(user: UserData): Observable<UserData> {
    const index = this.mockUsers.findIndex((u) => u.id === user.id);

    if (index !== -1) {
      this.mockUsers[index] = { ...user };
      return of({ ...user }).pipe(delay(800));
    }

    // If user not found, return empty object
    return of({} as UserData).pipe(delay(500));
  }

  /**
   * Delete a user by ID
   * @param id User ID to delete
   * @returns Observable of success status
   */
  deleteUser(id: string): Observable<boolean> {
    const index = this.mockUsers.findIndex((user) => user.id === id);

    if (index !== -1) {
      this.mockUsers.splice(index, 1);
      return of(true).pipe(delay(800));
    }

    return of(false).pipe(delay(500));
  }

  /**
   * Generate a simple ID for mock data
   * @returns A new unique ID string
   */
  private generateId(): string {
    // Find the highest current ID and add 1
    const ids = this.mockUsers.map((user) => parseInt(user.id, 10));
    const maxId = Math.max(...ids);
    return (maxId + 1).toString();
  }
}
