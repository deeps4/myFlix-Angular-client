import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MoviesListComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];
