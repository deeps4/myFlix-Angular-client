import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component for displaying the welcome page.
 *
 * The `WelcomePageComponent` serves as the entry point for the application,
 * providing options for user registration and login by opening respective dialogs.
 */
@Component({
  selector: 'app-welcome-page',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * Opens a dialog for user registration.
   *
   * This method triggers the opening of a modal dialog with the `UserRegistrationFormComponent`
   * where users can fill in their details for registration. The dialog has a fixed width of 400px.
   *
   * @returns {void} This method does not return any value.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '400px',
    });
  }

  /**
   * Opens a dialog for user login.
   *
   * This method triggers the opening of a modal dialog with the `UserLoginFormComponent`
   * where users can enter their login credentials. The dialog has a fixed width of 400px.
   *
   * @returns {void} This method does not return any value.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '400px',
    });
  }
}
