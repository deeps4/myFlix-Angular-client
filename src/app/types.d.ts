// Type file which will contains all types which will be used in the application.

export type UserRegistrationDetails = {
  Username: string;
  Password: string;
  Email: string;
  Birthday: string;
};

export type UserLoginDetails = {
  Username: string;
  Password: string;
};

export type UserUpdateDetails = {
  Username: string;
  Email: string;
  Birthday: string;
};

export type MovieDirector = {
  Bio: string;
  Birth: string;
  Name: string;
};

export type MovieGenre = {
  Description: string;
  Name: string;
};

export type MovieDetails = {
  Description: string;
  Director: MovieDirector;
  Featured: true;
  Genre: MovieGenre;
  ImagePath: string;
  Title: string;
  _id: string;
};

export type UserDetails = {
  Username: string;
  Email: string;
  Birthday: string;
  FavouriteMovies: string[];
  _id: string;
};
