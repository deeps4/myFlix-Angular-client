import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MovieDetails, UserDetails } from '../types';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movies-list',
  imports: [
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
  ],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent implements OnInit {
  movies: MovieDetails[] = [];
  favouriteMovies: string[] = [];
  username: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserInfoFromStorage();
  }

  getUserInfoFromStorage() {
    const userFromStorage = localStorage.getItem('userData');
    if (userFromStorage) {
      const userData: UserDetails = JSON.parse(userFromStorage);
      this.favouriteMovies = userData.FavouriteMovies;
      this.username = userData.Username;
    }
  }

  getMovies() {
    this.fetchApiData.getAllMovies().subscribe({
      next: (result) => {
        this.movies = result;
      },
      error: (error) => {
        this.snackBar.open(error, 'ok', { duration: 3000 });
      },
    });
  }

  openMovieDetail(title: string, description: string) {
    this.dialog.open(MovieDetailsComponent, {
      width: '400px',
      data: {
        title,
        description,
      },
    });
  }

  isFavouriteMovie(movieId: string): boolean {
    return this.favouriteMovies.includes(movieId);
  }

  toggleFavouriteMovieSelection(movieId: string) {
    const subscriptionHandler = {
      next: (result: UserDetails) => {
        this.favouriteMovies = result.FavouriteMovies;
        localStorage.setItem('userData', JSON.stringify(result));
      },
      error: (error: string) => {
        this.snackBar.open(error, 'ok', { duration: 3000 });
      },
    };

    if (this.isFavouriteMovie(movieId)) {
      this.fetchApiData
        .removeFavouriteMovie(this.username, movieId)
        .subscribe(subscriptionHandler);
    } else {
      this.fetchApiData
        .addFavouriteMovie(this.username, movieId)
        .subscribe(subscriptionHandler);
    }
  }
}
