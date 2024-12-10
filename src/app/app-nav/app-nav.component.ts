import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AppStorageService } from '../app-storage.service';

@Component({
  selector: 'app-nav',
  imports: [MatToolbarModule, MatIconModule, MatMenuModule, RouterModule],
  templateUrl: './app-nav.component.html',
  styleUrl: './app-nav.component.scss',
})
export class AppNavComponent {
  constructor(public appStorage: AppStorageService) {}

  /**
   * Logs out the current user by clearing user data from storage.
   *
   * This method calls the `logoutUser` method from `appStorage` to remove any user-related data
   * from the local storage or session, effectively logging the user out.
   *
   * @returns {void} This method does not return any value.
   */
  handleLogout(): void {
    this.appStorage.logoutUser();
  }
}
