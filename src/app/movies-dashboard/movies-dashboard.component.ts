import { Component } from '@angular/core';
import { MoviesListComponent } from '../movies-list/movies-list.component';

/**
 * Component responsible for displaying the movie dashboard.
 *
 * This component serves as a container or wrapper for the movies list. It imports
 * the `MoviesListComponent` to show a list of movies within the dashboard.
 *
 * @example
 * <app-movies-dashboard></app-movies-dashboard>
 */
@Component({
  selector: 'app-movies-dashboard',
  imports: [MoviesListComponent],
  templateUrl: './movies-dashboard.component.html',
  styleUrl: './movies-dashboard.component.scss',
})
export class MoviesDashboardComponent {}
