import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserDetails } from '../types';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AppStorageService } from '../app-storage.service';
import { MoviesListComponent } from '../movies-list/movies-list.component';

/**
 * Component for managing and displaying the user's profile information.
 *
 * The `UserProfileComponent` allows the user to view and update their profile, including
 * their username, email, and birthday. It integrates with the backend API to update and
 * manage user data.
 *
 * @example
 * <user-profile></user-profile>
 */
@Component({
  selector: 'app-user-profile',
  imports: [
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MoviesListComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Email: '',
    Birthday: '',
  };
  currentUsername: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    public appStorage: AppStorageService
  ) {}

  ngOnInit(): void {
    this.getUserDataFromStorage();
  }

  /**
   * Retrieves user data from storage and updates the component's user-related properties.
   *
   * This method fetches the stored user data using `appStorage.getUserData()`. If the data exists,
   * it maps the relevant information (Username, Email, Birthday) to the component's properties.
   * The Birthday is formatted to `YYYY-MM-DD` format, and the current username is also set.
   *
   * @returns {void} This method does not return any value.
   */
  getUserDataFromStorage(): void {
    const userData = this.appStorage.getUserData();
    if (userData) {
      this.userData = {
        Username: userData.Username,
        Email: userData.Email,
        Birthday: new Date(userData.Birthday).toISOString().split('T')[0],
      };
      this.currentUsername = userData.Username;
    }
  }

  /**
   * Updates the user's profile data by making a request to the server.
   *
   * This method sends a request to update the user's profile using the `fetchApiData.updateUser` method,
   * passing the current username and updated user data. Upon a successful update, the user's data is
   * refreshed by calling `getUserDataFromStorage()`, and a success message is shown via a snackbar.
   * In case of an error, the error message is displayed in the snackbar.
   *
   * @returns {void} This method does not return any value.
   */
  updateUserInfo(): void {
    this.fetchApiData
      .updateUser(this.currentUsername, this.userData)
      .subscribe({
        next: () => {
          this.getUserDataFromStorage();

          this.snackBar.open('Profile data updated successfully', 'OK', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.snackBar.open(error, 'OK', {
            duration: 3000,
          });
        },
      });
  }

  /**
   * Deregisters (deletes) the user's account by making a request to the server.
   *
   * This method sends a request to delete the user's profile using the `fetchApiData.deleteUser` method,
   * passing the current username. Upon successful deletion, a success message is shown in the snackbar,
   * and the user is logged out by calling `appStorage.logoutUser()`. In case of an error, the error message
   * is displayed in the snackbar.
   *
   * @returns {void} This method does not return any value.
   */
  deregisterUser(): void {
    this.fetchApiData.deleteUser(this.currentUsername).subscribe({
      next: () => {
        this.snackBar.open('Profile data deleted successfully', 'OK', {
          duration: 3000,
        });
        this.appStorage.logoutUser();
      },
      error: (error) => {
        this.snackBar.open(error, 'OK', {
          duration: 3000,
        });
      },
    });
  }
}
