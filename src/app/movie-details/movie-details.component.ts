import { Component, inject, Inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component that displays detailed information about a movie.
 *
 * This component is used within a dialog to show a movie's title and description.
 * The data is passed to the component via `MAT_DIALOG_DATA`, and it is injected into the component.
 *
 * @example
 * <MovieDetailsComponent [data]="{ title: 'Inception', description: 'A mind-bending thriller by Christopher Nolan.' }">
 * </MovieDetailsComponent>
 */

@Component({
  selector: 'app-movie-details',
  imports: [MatCardModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent {
  data: { title: string; description: string } = inject(MAT_DIALOG_DATA);

  constructor() {}
}
