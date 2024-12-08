import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppStorageService } from './app-storage.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppNavComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isUserLoggedIn = false;

  constructor(public appStorage: AppStorageService, public router: Router) {
    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('Route Changed', event);
        this.getUserLoginStatus();
      });
  }

  getUserLoginStatus() {
    this.isUserLoggedIn = this.appStorage.isUserLoggedIn();
  }
}
