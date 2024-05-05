import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { environment } from '@env/environments';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  register(user: User) {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('access_token', response.access_token);

          this.userSubject.next(response.user);
        })
      );
  }

 checkAuthentication(): Observable<boolean> {
  return this.user$
    .pipe(
      map(user => user?.role === 'admin' || false)
    );
  }


  // logout() {
  //   this.user = undefined;
  //   localStorage.removeItem('user');
  // }

}




