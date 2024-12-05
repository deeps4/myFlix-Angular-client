import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { J } from '@angular/cdk/keycodes';

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
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser() {
    this.fetchApiData.loginUser(this.userData).subscribe({
      next: (result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userData', JSON.stringify(result.user));
        this.dialogRef.close();

        this.snackBar.open('User logged in successfully', 'OK', {
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
