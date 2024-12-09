import { Component, input, OnInit } from '@angular/core';
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
import { AppStorageService } from '../app-storage.service';

@Component({
  selector: 'movies-list',
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
  showOnlyFavouriteMovies = input.required<boolean>();

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public appStorage: AppStorageService
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserInfoFromStorage();
  }

  getUserInfoFromStorage() {
    const userData = this.appStorage.getUserData();
    if (userData) {
      this.favouriteMovies = userData.FavouriteMovies;
      this.username = userData.Username;
    }
  }

  getMovies() {
    this.fetchApiData.getAllMovies().subscribe({
      next: (result) => {
        if (this.showOnlyFavouriteMovies()) {
          this.movies = this.filterFavouriteMovies(result);
        } else {
          this.movies = result;
        }
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
      next: () => {
        this.getMovies();
        this.getUserInfoFromStorage();
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

  filterFavouriteMovies(movies: MovieDetails[]) {
    const filteredMovies = this.favouriteMovies.map((movieId) => {
      const matchedMovie = movies.find((movie) => {
        return movie._id === movieId;
      });

      return matchedMovie as MovieDetails;
    });
    return filteredMovies;
  }

  shouldShowEmptyMoviesMessage = (): boolean => {
    return this.showOnlyFavouriteMovies() && this.favouriteMovies.length === 0;
  };
}
