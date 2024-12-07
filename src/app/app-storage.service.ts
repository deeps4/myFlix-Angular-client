import { Injectable } from '@angular/core';
import { UserDetails } from './types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  constructor(private router: Router) {}

  getUserData(): UserDetails | null {
    const userDataFromStorage = localStorage.getItem('userData');
    if (userDataFromStorage) {
      return JSON.parse(userDataFromStorage);
    }
    return null;
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  isUserLoggedIn(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  setUserData(userData: UserDetails): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}
