import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * Component that handles the user login form.
 *
 * The `UserLoginFormComponent` is responsible for rendering a login form where the user
 * can enter their username and password. It communicates with the backend to authenticate
 * the user and, on successful login, navigates to the movie dashboard.
 *
 * @example
 * <user-login-form></user-login-form>
 */
@Component({
  selector: 'app-user-login-form',
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
  ],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Handles user login by sending the user's credentials to the API.
   *
   * This method calls the `loginUser` API with the user's data. On successful login,
   * it closes the login dialog and redirects the user to the movies page. If an error
   * occurs during login, an error message is displayed in a snackbar.
   *
   * @returns {void} This method does not return any value.
   */
  loginUser(): void {
    this.fetchApiData.loginUser(this.userData).subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        this.snackBar.open(error, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
