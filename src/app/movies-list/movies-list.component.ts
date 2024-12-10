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

/**
 * Component that displays a list of movies and allows users to interact with them.
 *
 * The `MoviesListComponent` is responsible for showing the movies in a list format.
 * It supports displaying favorite movies, fetching movie data, and interacting with
 * the movie details. The component also provides functionality to handle favorite movie
 * selections and user data retrieval from local storage.
 *
 * @example
 * <movies-list></movies-list>
 */
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

  /** Flag indicating if only favorite movies should be shown */
  showOnlyFavouriteMovies = input.required<boolean>();

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public appStorage: AppStorageService
  ) {}

  /**
   * Initializes the component by fetching movies and user data.
   *
   * @returns void
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUserInfoFromStorage();
  }

  /**
   * Retrieves user information from storage(AppStorageService) and updates component properties.
   *
   * - Fetches user data (if available) from the application's storage.
   * - Updates `favouriteMovies` with the user's favorite movies.
   * - Updates `username` with the user's name.
   *
   * @returns {void} This method does not return anything; it updates component properties.
   */

  getUserInfoFromStorage(): void {
    const userData = this.appStorage.getUserData();
    if (userData) {
      this.favouriteMovies = userData.FavouriteMovies;
      this.username = userData.Username;
    }
  }

  /**
   * Fetches the list of movies from the API and updates the movie list.
   *
   * - If `showOnlyFavouriteMovies` is true, the list is filtered to include only favorite movies.
   * - Otherwise, all movies are displayed.
   * - Handles any API errors by showing a notification via `MatSnackBar`.
   *
   * @returns {void} This method does not return anything; it updates the component's `movies` property.
   */

  getMovies(): void {
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
  /**
   * Opens a dialog displaying the details of a selected movie.
   *
   * - Launches a modal dialog with the provided movie title and description.
   * - Passes the movie details as data to the `MovieDetailsComponent`.
   *
   * @param {string} title - The title of the movie to display.
   * @param {string} description - A brief description of the movie.
   * @returns {void} This method does not return anything.
   */
  openMovieDetail(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '400px',
      data: {
        title,
        description,
      },
    });
  }

  /**
   * Checks if a movie is in the list of favourite movies.
   *
   * @param {string} movieId - The unique identifier of the movie to check.
   * @returns {boolean} Returns `true` if the movie exists in the favourite movies list, otherwise `false`.
   */
  isFavouriteMovie(movieId: string): boolean {
    return this.favouriteMovies.includes(movieId);
  }

  /**
   * Toggles the favourite status of a movie for the user.
   *
   * If the movie is already in the user's favourites list, it will be removed.
   * Otherwise, it will be added to the list. Upon success, the method refreshes
   * the movies list and user information. Errors are displayed using a snack bar.
   *
   * @param {string} movieId - The unique identifier of the movie to toggle.
   */
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

  /**
   * Filters a list of movies to only include the user's favourite movies.
   *
   * This method takes an array of `MovieDetails` and returns a new array containing only the movies
   * that are marked as favourites for the user, based on the `favouriteMovies` list. It matches the
   * movie IDs in the `favouriteMovies` list with the IDs of the provided movies.
   *
   * @param {MovieDetails[]} movies - An array of movie objects to be filtered.
   * @returns {MovieDetails[]} A new array containing only the user's favourite movies.
   */
  filterFavouriteMovies(movies: MovieDetails[]): MovieDetails[] {
    const filteredMovies = this.favouriteMovies.map((movieId) => {
      const matchedMovie = movies.find((movie) => {
        return movie._id === movieId;
      });

      return matchedMovie as MovieDetails;
    });
    return filteredMovies;
  }

  /**
   * Determines whether to show a message indicating there are no favourite movies.
   *
   * This method checks if the user is currently viewing only their favourite movies,
   * and whether the list of favourite movies is empty. If both conditions are true,
   * it returns `true`, indicating that a message should be shown to the user.
   *
   * @returns {boolean} `true` if the user is viewing only favourite movies and the list is empty,
   *                   otherwise `false`.
   */
  shouldShowEmptyMoviesMessage = (): boolean => {
    return this.showOnlyFavouriteMovies() && this.favouriteMovies.length === 0;
  };
}
