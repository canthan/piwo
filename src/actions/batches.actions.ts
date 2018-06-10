import { AnyAction } from 'redux';
import { Dispatch, ThunkAction } from 'react-redux';
import Axios, { AxiosResponse, AxiosError } from 'axios';

import { CommonStorageService } from './../components/storage/common.service';

import { User, AsyncAction } from './../types/app.types';
import {
  Batch,
  EmptyBatch,
  Stash
} from './../components/storage/storage.types';

import {
  GET_USER_STORAGE_REQUEST,
  GET_USER_STORAGE_SUCCESS,
  GET_USER_STORAGE_FAILURE,
  ADD_BATCH_REQUEST,
  ADD_BATCH_SUCCESS,
  ADD_BATCH_FAILURE,
  ADD_STASH_REQUEST,
  ADD_STASH_SUCCESS,
  ADD_STASH_FAILURE,
  EDIT_BATCH_DATA_REQUEST,
  EDIT_BATCH_DATA_SUCCESS,
  EDIT_BATCH_DATA_FAILURE,
  UPDATE_STASHES_REQUEST,
  UPDATE_STASHES_SUCCESS,
  UPDATE_STASHES_FAILURE,
  DELETE_BATCH_REQUEST,
  DELETE_BATCH_SUCCESS,
  DELETE_BATCH_FAILURE,
} from './../constants/batches.actions.types';

export const getBatchesDataRequest = (): AnyAction => ({
  type: GET_USER_STORAGE_REQUEST,
});

export const getBatchesDataSuccess = (data: Batch[]): AnyAction => {
  const batches = CommonStorageService.formatDateForDisplay(data);
  CommonStorageService.calculateQuantities(batches);
  return {
    payload: batches,
    type: GET_USER_STORAGE_SUCCESS
  };
}
export const getBatchesDataFailure = (error): AnyAction => ({
  payload: error,
  type: GET_USER_STORAGE_FAILURE
});

export const addBatchRequest = (): AnyAction => ({
  type: ADD_BATCH_REQUEST
});

export const addBatchSuccess = (newBatch: Batch): AnyAction => {
  newBatch = CommonStorageService.formatDateForDisplay([newBatch])[0];
  return {
    payload: { newBatch },
    type: ADD_BATCH_SUCCESS
  };
};

export const addBatchFailure = (error: AxiosError): AnyAction => ({
  payload: error,
  type: ADD_BATCH_FAILURE
});

export const addStashRequest = (): AnyAction => ({
  type: ADD_STASH_REQUEST
});

export const addStashSuccess = (newStash: Stash): AnyAction => ({
  payload: { newStash },
  type: ADD_STASH_SUCCESS
});

export const addStashFailure = (error: AxiosError): AnyAction => ({
  payload: error,
  type: ADD_STASH_FAILURE
});

export const editBatchDataRequest = (): AnyAction => ({
  type: EDIT_BATCH_DATA_REQUEST
});

export const editBatchDataSuccess = (editedBatch: Batch): AnyAction => {
  editedBatch = CommonStorageService.formatDateForDisplay([editedBatch])[0];
  return {
    payload: { editedBatch },
    type: EDIT_BATCH_DATA_SUCCESS
  };
};

export const editBatchDataFailure = (error: AxiosError): AnyAction => ({
  payload: error,
  type: EDIT_BATCH_DATA_FAILURE
});

export const updateStashesRequest = (): AnyAction => ({
  type: UPDATE_STASHES_REQUEST
});

export const updateStashesSuccess = (updatedStashes: Stash[]): AnyAction => ({
  payload: { updatedStashes },
  type: UPDATE_STASHES_SUCCESS
});

export const updateStashesFailure = (error: AxiosError): AnyAction => ({
  payload: error,
  type: UPDATE_STASHES_FAILURE
});

export const deleteBatchRequest = (): AnyAction => ({
  type: DELETE_BATCH_REQUEST
});

export const deleteBatchSuccess = (batch_id: number): AnyAction => ({
  payload: { batch_id },
  type: DELETE_BATCH_SUCCESS
});

export const deleteBatchFailure = (error: AxiosError): AnyAction => ({
  payload: error,
  type: DELETE_BATCH_FAILURE
});

export const getBatchesDataAsync = (user_id: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getBatchesDataRequest());
    try {
      const response = await Axios.get(
        `http://localhost:1337/api/v1.0/batches/${user_id}`
      );
      dispatch(getBatchesDataSuccess(response.data));
    } catch (error) {
      dispatch(getBatchesDataFailure(error));
    }
  };
}

export const deleteBatchAsync = (
  user_id: number,
  batch_id: number
): AsyncAction => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(deleteBatchRequest());
    try {
      const response = await Axios.delete(
        `http://localhost:1337/api/v1.0/batches/${user_id}/${batch_id}`
      );
      const deletedBatch = response.data.data.batches.find(
        batch => (batch.batch_id = batch_id)
      );
      dispatch(deleteBatchSuccess(deletedBatch.batch_id));
    } catch (error) {
      dispatch(deleteBatchFailure(error));
    }
  };
}

export const addBatchAsync = (user_id: number, newBatch: EmptyBatch) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(addBatchRequest());
    try {
      const response: AxiosResponse<any> = await Axios.post(
        `http://localhost:1337/api/v1.0/batches/${user_id}`,
        newBatch
      );
      const newBatchResponse: Batch = response.data.data;
      dispatch(addBatchSuccess(newBatchResponse));
    } catch (error) {
      dispatch(addBatchFailure(error));
    }
  };
}

export const addStashAsync = (
  user_id: number,
  batch_id: number,
  newStash: Stash
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(addStashRequest());
    try {
      const response: AxiosResponse<any> = await Axios.post(
        `http://localhost:1337/api/v1.0/stashes/${user_id}/${batch_id}`,
        CommonStorageService.flattenItemsForRequest([newStash])
      );
      const newStashResponse: Stash = { ...response.data.data };
      dispatch(addStashSuccess(newStashResponse));
    } catch (error) {
      dispatch(addStashFailure(error));
    }
  };
}

export const updateStashesAsync = (
  user_id: number,
  batch_id: number,
  stashes: Stash[]
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(updateStashesRequest());
    try {
      const response: AxiosResponse<any> = await Axios.put(
        `http://localhost:1337/api/v1.0/stashes/${user_id}/${batch_id}`,
        CommonStorageService.flattenItemsForRequest(stashes)
      );
      const updatedStashes: Stash[] = [...response.data.data];
      dispatch(updateStashesSuccess(updatedStashes));
    } catch (error) {
      dispatch(updateStashesFailure(error));
    }
  };
}

export const editBatchDataAsync = (
  user_id: number,
  batch_id: number,
  batchData: EmptyBatch
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(editBatchDataRequest());
    try {
      const response: AxiosResponse<any> = await Axios.put(
        `http://localhost:1337/api/v1.0/batches/${user_id}/${batch_id}`,
        { batch: batchData }
      );
      const updatedBatch: Batch = response.data.data[0];
      dispatch(editBatchDataSuccess(updatedBatch));
    } catch (error) {
      dispatch(editBatchDataFailure(error));
    }
  };
}
