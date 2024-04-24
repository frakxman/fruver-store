import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap,  } from 'rxjs';

import { environment } from '@env/environments';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private user?: User;
  users: User[] = [];

  getAllUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  register(user: User) {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  // With Get to internal api
  login(email: string, password: string): Observable<User> {
    return this.getAllUsers()
      .pipe(
        map(users => users.filter(user => user.email === email && user.password === password)[0]),
        tap(user => {
          if (user) {
            this.user = user;
            if (this.user.id) {
              localStorage.setItem('user', this.user.id.toString());
            }
          }
        })
      );
  }
  
  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return false;
  }


}
