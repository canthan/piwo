export interface IAppState {
  user: {
    user_id: number,
    username: string,
    firstname: string,
    surname: string,
    email: string,
  };
  loaded: boolean;
  loggedIn: boolean;
}

export interface IUser {
  email: string;
  firstname: string;
  password: string;
  registration_dat1e: string;
  surname: string;
  user_id: number;
  username: string;
}