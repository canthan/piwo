import { CommonStorageService } from './../components/storage/common.service';
import Axios, { AxiosResponse, AxiosError } from 'axios';
import { User, AsyncAction } from './../types/app.types';
import { Dispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { StorageActionTypes } from './../constants/actionTypes';
import { Batch, EmptyBatch } from './../components/storage/storage.types';

export function getBatchesDataRequest(): AnyAction {
  return {
    type: StorageActionTypes.GET_USER_STORAGE_REQUEST
  };
}
export function getBatchesDataSuccess(data: Batch[]): AnyAction {
  const batches = CommonStorageService.formatDateForDisplay(data);
  CommonStorageService.calculateQuantities(batches);
  return {
    batches,
    type: StorageActionTypes.GET_USER_STORAGE_SUCCESS
  };
}
export function getBatchesDataFailure(): AnyAction {
  return {
    error: true,
    type: StorageActionTypes.GET_USER_STORAGE_FAILURE
  };
}

export function addBatchRequest(): AnyAction {
  return {
    type: StorageActionTypes.ADD_BATCH_REQUEST
  };
}

export function addBatchSuccess(batches: Batch[]): AnyAction {
  return {
    batches,
    type: StorageActionTypes.ADD_BATCH_SUCCESS
  };
}

export function addBatchFailure(): AnyAction {
  return {
    error: true,
    type: StorageActionTypes.ADD_BATCH_FAILURE
  };
}

export function deleteBatchRequest(): AnyAction {
  return {
    type: StorageActionTypes.DELETE_BATCH_REQUEST
  };
}

export function deleteBatchSuccess(deletedBatch: Batch): AnyAction {
  return {
    batch: deletedBatch,
    type: StorageActionTypes.DELETE_BATCH_SUCCESS
  };
}

export function deleteBatchFailure(): AnyAction {
  return {
    error: true,
    type: StorageActionTypes.DELETE_BATCH_FAILURE
  };
}

export function getBatchesDataAsync(user_id: number) {

  console.log('getBatchesDataAsync')
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getBatchesDataRequest());
    try {
      const response = await Axios.get(
        `http://localhost:1337/api/v1.0/batches/${user_id}`
      );
      dispatch(getBatchesDataSuccess(response.data));
    } catch (error) {
      dispatch(getBatchesDataFailure());
    }
  };
}

export function deleteBatchAsync(user_id: number, batch_id: number): AsyncAction {
  
  console.log('deleteBatchAsync')
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(deleteBatchRequest());
    try {
      const response = await Axios.delete(
        `http://localhost:1337/api/v1.0/batches/${user_id}/${batch_id}`
      );
      console.log(response);
      dispatch(deleteBatchSuccess(response.data.data));
    } catch (error) {
      dispatch(deleteBatchFailure());
    }
  };
}

export function addBatchAsync(user_id: number, newBatch: EmptyBatch) {
  return (dispatch: Dispatch<AnyAction>, getState) => {
    const batches = getState().storage.batches;
    dispatch(addBatchRequest());
    Axios.post(`http://localhost:1337/api/v1.0/batches/${user_id}`, newBatch)
      .then((response: AxiosResponse<any>) => {
        batches.push(response.data.data);
        dispatch(addBatchSuccess(batches));
      })
      .catch((error: AxiosError) => {
        dispatch(addBatchFailure());
      });
  };
}

