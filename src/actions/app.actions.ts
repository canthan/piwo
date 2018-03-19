import { AppStateInterface } from './../reducers/initialState';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppActionTypes } from './../constants/actionTypes';
import { AppState, User } from './../types/app.types';

export type GetUserData = ThunkAction<void, AppStateInterface, null>;

function getUserDataRequest(): AnyAction {
  return {
    type: AppActionTypes.GET_USER_DATA_REQUEST,
  };
}

function getUserDataSuccess(data: User): AnyAction {
  console.log(data);
  return {
    data,
    loaded: true,
    loggedIn: true,
    type: AppActionTypes.GET_USER_DATA_SUCCESS,
  };
}

function getUserDataFailure(): AnyAction {
  return {
    type: AppActionTypes.GET_USER_DATA_FAILURE,
    error: true,
  };
}

export function getUserData(user_id: number) {
  console.log('getUserData');
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(getUserDataRequest());
    Axios.get(`http://localhost:1337/api/v1.0/user_data/${user_id}`)
      .then((response: AxiosResponse<any>) => {
        console.log(response);
        dispatch(getUserDataSuccess(response.data.data));
      })
      .catch((error: AxiosError) => {
        dispatch(getUserDataFailure());
      });
  };
}
