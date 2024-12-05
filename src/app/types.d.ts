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
