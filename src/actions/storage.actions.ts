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
  return {
    data,
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

export function deleteBatchRequest(): AnyAction {
  return {
    type: StorageActionTypes.DELETE_BATCH_REQUEST
  };
}

export function deleteBatchSuccess(deletedBatch: Batch): AnyAction {
  return {
    data: deletedBatch,
    type: StorageActionTypes.DELETE_BATCH_SUCCESS
  };
}

export function deleteBatchFailure(): AnyAction {
  return {
    error: true,
    type: StorageActionTypes.DELETE_BATCH_FAILURE
  };
}

// export function getBatchesData(data: Batch[]) {
//   return (dispatch: Dispatch<AnyAction>) => {
//     dispatch(getBatchesDataSuccess(data));
//   };
// }
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
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(deleteBatchRequest());
    try {
      const response = await Axios.delete(
        `http://localhost:1337/api/v1.0/batches/${user_id}/${batch_id}`
      );
      dispatch(deleteBatchSuccess(response.data));
    } catch (error) {
      dispatch(deleteBatchFailure());
    }
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

