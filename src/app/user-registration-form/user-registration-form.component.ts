import { Component, Input, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component for handling user registration.
 *
 * The `UserRegistrationFormComponent` provides a form where users can input their
 * details to register a new account. It integrates with the backend API to store
 * user credentials and profile data.
 *
 * @example
 * <user-registration-form></user-registration-form>
 */
@Component({
  selector: 'app-user-registration-form',
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
  ],
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss',
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Registers a new user by sending the user data to the server.
   *
   * This method sends a request to register a new user using the `fetchApiData.registerUser` method,
   * passing the `userData` object. Upon successful registration, a success message is shown in the snackbar,
   * and the dialog is closed. In case of an error, the error message is displayed in the snackbar.
   *
   * @returns {void} This method does not return any value.
   */

  registerUser(): void {
    this.fetchApiData.registerUser(this.userData).subscribe({
      next: (result) => {
        this.dialogRef.close();

        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
      error: (error) => {
        this.snackBar.open(error, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
