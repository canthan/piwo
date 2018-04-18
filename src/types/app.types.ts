import { ThunkAction } from 'redux-thunk';
import { Batch, Stash, StorageState, ItemState } from './../components/storage/storage.types';

export interface AppState {
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

export interface User {
  email: string;
  firstname: string;
  password: string;
  registration_date: string;
  surname: string;
  user_id: number;
  username: string;
}

export type AsyncAction = ThunkAction<Promise<void>, AppState, null>;
