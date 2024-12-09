import { Component } from '@angular/core';
import { MoviesListComponent } from '../movies-list/movies-list.component';

@Component({
  selector: 'app-movies-dashboard',
  imports: [MoviesListComponent],
  templateUrl: './movies-dashboard.component.html',
  styleUrl: './movies-dashboard.component.scss',
})
export class MoviesDashboardComponent {}
