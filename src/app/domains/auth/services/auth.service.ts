import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap,  } from 'rxjs';

import { environment } from '@env/environments';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private user?: User;

  get currentUser(): User | undefined {
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('user', JSON.stringify(user)))
      );
  }

  register(user: User) {
    console.log('Registered user', user);
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return false;
  }


}
