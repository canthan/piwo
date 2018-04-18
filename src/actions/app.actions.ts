import { Batch } from './../components/storage/storage.types';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppActionTypes, StorageActionTypes } from './../constants/actionTypes';
import { AppState, User } from './../types/app.types';
import { getBatchesDataAsync } from './storage.actions';

function getUserDataRequest(): AnyAction {
  return {
    type: AppActionTypes.GET_USER_DATA_REQUEST,
  };
}

function getUserDataSuccess(data: User): AnyAction {
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

export function getUserDataAsync(user_id: number) {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(getUserDataRequest());
    Axios.get(`http://localhost:1337/api/v1.0/user_data/${user_id}`)
      .then((response: AxiosResponse<any>) => {
        console.log(response);
        dispatch(getUserDataSuccess(response.data.data));
        // dispatch(getBatchesDataAsync(response.data.data.batches));
      })
      .catch((error: AxiosError) => {
        dispatch(getUserDataFailure());
      });
  };
}
