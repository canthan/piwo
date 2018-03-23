import  Axios, { AxiosResponse, AxiosError } from 'axios';
import { AppStateInterface } from './../reducers/initialState';
import { User } from './../types/app.types';
import { Dispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StorageActionTypes } from './../constants/actionTypes';
import { Batch, EmptyBatch } from './../components/storage/storage.types';


export type GetBatchesData = ThunkAction<void, AppStateInterface, null>;

export function getBatchesDataSuccess(data: Batch[]): AnyAction {
  return {
    data,
    type: StorageActionTypes.GET_USER_STORAGE_SUCCESS
  };
}

export function addBatchRequest(): AnyAction {
  return {
    type: StorageActionTypes.ADD_BATCH_REQUEST
  };
}

export function addBatchSuccess(newBatch: Batch[]): AnyAction {
  return {
    data: newBatch,
    type: StorageActionTypes.ADD_BATCH_SUCCESS
  };
}

export function addBatchFailure(): AnyAction {
  return {
    error: true,
    type: StorageActionTypes.ADD_BATCH_FAILURE
  };
}

export function getBatchesData(data: Batch[]) {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(getBatchesDataSuccess(data));
  };
}

export function addbatch(newBatch: EmptyBatch, user_id: number) {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(addBatchRequest());
    Axios.post(`http://localhost:1337/api/v1.0/batches/${user_id}`, newBatch)
      .then((response: AxiosResponse<any>) => {
        console.log(response);
        dispatch(addBatchSuccess(response.data.data));
      })
      .catch((error: AxiosError) => {
        dispatch(addBatchFailure());
      });
  };
}

export default getBatchesData;
