import Axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Batch } from './../components/storage/storage.types';
import { AppState, User } from './../types/app.types';

import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  GET_BATCHES_FROM_USER_DATA,
} from './../constants/app.action.types';
import { getBatchesDataAsync } from './storage.actions';

import { CommonStorageService } from './../components/storage/common.service';

export const getUserDataRequest = (): AnyAction => ({
  type: GET_USER_DATA_REQUEST
});

export const getUserDataSuccess = (userData: User): AnyAction => ({
  payload: {
    userData,
    loaded: true,
    loggedIn: true,
  },
  type: GET_USER_DATA_SUCCESS
});

export const getUserDataFailure = (error): AnyAction => ({
  payload: error,
  type: GET_USER_DATA_FAILURE
});

export const getBatchesFromUserData = (batches: Batch[]) => {
  batches = CommonStorageService.formatDateForDisplay(batches);
  CommonStorageService.calculateQuantities(batches);
  return {
    payload: { batches },
    type: GET_BATCHES_FROM_USER_DATA
  };
};

export const getUserDataAsync = (user_id: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getUserDataRequest());
    try {
      const response: AxiosResponse<any> = await Axios.get(`http://localhost:1337/api/v1.0/user_data/${user_id}`);
      const userData = response.data.data;
      dispatch(getUserDataSuccess(userData));
      dispatch(getBatchesFromUserData(userData.batches));
    } catch (error) {
      dispatch(getUserDataFailure(error));
    }
  };
};
