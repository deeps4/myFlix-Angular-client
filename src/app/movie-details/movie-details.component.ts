import { Component, inject, Inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
