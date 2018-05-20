import { CommonStorageService } from './../components/storage/common.service';
import Axios, { AxiosResponse, AxiosError } from 'axios';
import { User, AsyncAction } from './../types/app.types';
import { Dispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { StorageActionTypes } from './../constants/actionTypes';
import { Batch, EmptyBatch, Stash } from './../components/storage/storage.types';

export function getBatchesDataRequest(): AnyAction {
  return {
    type: StorageActionTypes.GET_USER_STORAGE_REQUEST,
  };
}
export function getBatchesDataSuccess(data: Batch[]): AnyAction {
  const batches = CommonStorageService.formatDateForDisplay(data);
  CommonStorageService.calculateQuantities(batches);
  return {
    batches,
    type: StorageActionTypes.GET_USER_STORAGE_SUCCESS,
  };
}
export function getBatchesDataFailure(): AnyAction {
  return {
    error: true,
    type: StorageActionTypes.GET_USER_STORAGE_FAILURE,
  };
}

export function addBatchRequest(): AnyAction {
  return {
    type: StorageActionTypes.ADD_BATCH_REQUEST,
  };
}

export function addBatchSuccess(newBatch: Batch): AnyAction {
  return {
    newBatch,
    type: StorageActionTypes.ADD_BATCH_SUCCESS,
  };
}

export function addBatchFailure(error: AxiosError): AnyAction {
  return {
    error,
    type: StorageActionTypes.ADD_BATCH_FAILURE,
  };
}

export function addStashRequest(): AnyAction {
  return {
    type: StorageActionTypes.ADD_STASH_REQUEST,
  };
}

export function addStashSuccess(newStash: Stash): AnyAction {
  return {
    stash: newStash,
    type: StorageActionTypes.ADD_STASH_SUCCESS,
  };
}

export function addStashFailure(error: AxiosError): AnyAction {
  return {
    error,
    type: StorageActionTypes.ADD_STASH_FAILURE,
  };
}

export function updateStashesRequest(): AnyAction {
  return {
    type: StorageActionTypes.UPDATE_STASHES_REQUEST,
  };
}

export function updateStashesSuccess(updatedStashes: Stash[]): AnyAction {
  return {
    stashes: updatedStashes,
    type: StorageActionTypes.UPDATE_STASHES_SUCCESS,
  };
}

export function updateStashesFailure(error: AxiosError): AnyAction {
  return {
    error,
    type: StorageActionTypes.UPDATE_STASHES_FAILURE,
  };
}

export function deleteBatchRequest(): AnyAction {
  return {
    type: StorageActionTypes.DELETE_BATCH_REQUEST,
  };
}

export function deleteBatchSuccess(batch_id: number): AnyAction {
  return {
    batch_id,
    type: StorageActionTypes.DELETE_BATCH_SUCCESS,
  };
}

export function deleteBatchFailure(error: AxiosError): AnyAction {
  return {
    error,
    type: StorageActionTypes.DELETE_BATCH_FAILURE,
  };
}

export function getBatchesDataAsync(user_id: number) {
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
      const deletedBatch = response.data.data.batches.find(batch => batch.batch_id = batch_id);
      dispatch(deleteBatchSuccess(deletedBatch.batch_id));
    } catch (error) {
      dispatch(deleteBatchFailure(error));
    }
  };
}

export function addBatchAsync(user_id: number, newBatch: EmptyBatch) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(addBatchRequest());
    try {
      const response: AxiosResponse<any> = await Axios.post(
        `http://localhost:1337/api/v1.0/batches/${user_id}`, newBatch);
      const newBatchResponse: Batch = response.data.data;
      dispatch(addBatchSuccess(newBatchResponse));
    }
    catch (error) {
      dispatch(addBatchFailure(error));
    }
  };
}

export function addStashAsync(user_id: number, batch_id: number, newStash: Stash) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(addStashRequest());
    try {
      const response: AxiosResponse<any> = await Axios.post(
        `http://localhost:1337/api/v1.0/stashes/${user_id}/${batch_id}`,
        CommonStorageService.flattenItemsForRequest([newStash])
      );
      const newStashResponse: Stash = {...response.data.data};
      dispatch(addStashSuccess(newStashResponse));
    }
    catch (error) {
      dispatch(addStashFailure(error));
    }
  };
}

export function updateStashesAsync(user_id: number, batch_id: number, stashes: Stash[]) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(updateStashesRequest());
    try {
      const response: AxiosResponse<any> = await Axios.put(
        `http://localhost:1337/api/v1.0/stashes/${user_id}/${batch_id}`,
        CommonStorageService.flattenItemsForRequest(stashes)
      );
      const updatedStashes: Stash[] = {...response.data.data};
      dispatch(updateStashesSuccess(updatedStashes));
    }
    catch (error) {
      dispatch(updateStashesFailure(error));
    }
  };
}
