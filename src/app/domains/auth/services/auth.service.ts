import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login() {
    console.log('Login');
  }

  register(user: User) {
    console.log('Registered user', user);
  }

  logout() {
    console.log('Logout');
  }

  isAuthenticated(): boolean {
    return false;
  }


}
