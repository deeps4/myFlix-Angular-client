import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  MovieDetails,
  UserLoginDetails,
  UserRegistrationDetails,
  UserUpdateDetails,
} from './types';
import { AppStorageService } from './app-storage.service';

const apiUrl = 'https://my-movies-flix-05-b51bd5948ca6.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(
    private http: HttpClient,
    private appStorage: AppStorageService
  ) {}

  // User registration
  public registerUser(
    registrationDetails: UserRegistrationDetails
  ): Observable<any> {
    return this.http
      .post(`${apiUrl}/users`, registrationDetails)
      .pipe(catchError(this.handleError));
  }

  // User login
  public loginUser(loginDetails: UserLoginDetails): Observable<any> {
    return this.http.post(`${apiUrl}/login`, loginDetails).pipe(
      catchError(this.handleError),
      map((result) => {
        this.appStorage.setToken(result.token);
        this.appStorage.setUserData(result.user);
      })
    );
  }

  // Get all movies
  public getAllMovies(): Observable<MovieDetails[]> {
    const token = this.appStorage.getToken();
    return this.http
      .get<MovieDetails[]>(`${apiUrl}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get one movie which contains director and genre also.
  public getMovie(movieId: string): Observable<any> {
    const token = this.appStorage.getToken();
    return this.http
      .get(`${apiUrl}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Add a movie to favourite Movies
  public addFavouriteMovie(username: string, movieId: string): Observable<any> {
    const token = this.appStorage.getToken();
    return this.http
      .post(`${apiUrl}/users/${username}/movies/${movieId}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        catchError(this.handleError),
        map((result) => {
          this.appStorage.setUserData(result);
        })
      );
  }

  // Edit user
  public updateUser(
    username: string,
    userDetails: UserUpdateDetails
  ): Observable<any> {
    const token = this.appStorage.getToken();
    return this.http
      .put(`${apiUrl}/users/${username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        catchError(this.handleError),
        map((result) => {
          this.appStorage.setUserData(result);
        })
      );
  }

  // Delete user
  public deleteUser(username: string): Observable<any> {
    const token = this.appStorage.getToken();
    return this.http
      .delete(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  // Delete a movie from the favorite movies
  public removeFavouriteMovie(
    username: string,
    movieId: string
  ): Observable<any> {
    const token = this.appStorage.getToken();
    return this.http
      .delete(`${apiUrl}/users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        catchError(this.handleError),
        map((result) => {
          this.appStorage.setUserData(result);
        })
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
          `Error body is: ${JSON.stringify(error.error)}`
      );
    }
    return throwError(() => 'Something bad happened; please try again later.');
  }
}
