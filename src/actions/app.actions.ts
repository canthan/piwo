import Axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppActionTypes, StorageActionTypes } from './../constants/actionTypes';
import { Batch } from './../components/storage/storage.types';
import { AppState, User } from './../types/app.types';

import { getBatchesDataAsync } from './storage.actions';

import { CommonStorageService } from './../components/storage/common.service';

function getUserDataRequest(): AnyAction {
  return {
    type: AppActionTypes.GET_USER_DATA_REQUEST
  };
}

function getUserDataSuccess(data: User): AnyAction {
  return {
    data,
    loaded: true,
    loggedIn: true,
    type: AppActionTypes.GET_USER_DATA_SUCCESS
  };
}

function getUserDataFailure(): AnyAction {
  return {
    error: true,
    type: AppActionTypes.GET_USER_DATA_FAILURE
  };
}

function getBatchesFromUserData(batches: Batch[]) {
  batches = CommonStorageService.formatDateForDisplay(batches);
  CommonStorageService.calculateQuantities(batches);
  return {
    batches: batches,
    type: AppActionTypes.GET_BATCHES_FROM_USER_DATA
  };
}

export function getUserDataAsync(user_id: number) {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(getUserDataRequest());
    Axios.get(`http://localhost:1337/api/v1.0/user_data/${user_id}`)
      .then((response: AxiosResponse<any>) => {
        console.log(response);
        dispatch(getUserDataSuccess(response.data.data));
        dispatch(getBatchesFromUserData(response.data.data.batches));
      })
      .catch((error: AxiosError) => {
        dispatch(getUserDataFailure());
      });
  };
}
