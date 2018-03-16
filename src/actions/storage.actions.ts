import { Dispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StorageActionTypes } from './../constants/actionTypes';
import { Batch } from './../components/storage/storage.types';

function getUserDataRequest(): AnyAction {
  return {
    type: StorageActionTypes.GET_USER_STORAGE_REQUEST,
  };
}

function getUserDataSuccess(data: Batch[] ): AnyAction {
  return {
    data,
    type: StorageActionTypes.GET_USER_STORAGE_SUCCESS,
  };
}

function getUserDataFailure(): AnyAction {
  return {
    type: StorageActionTypes.GET_USER_STORAGE_FAILURE,
    error: true,
  };
}
