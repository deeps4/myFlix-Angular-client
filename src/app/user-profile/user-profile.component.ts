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

  getUserDataFromStorage() {
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

  updateUserInfo() {
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
  deregisterUser() {
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
