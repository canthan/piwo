import { AnyAction } from 'redux';
import { Dispatch } from 'react-redux';
import Axios, { AxiosResponse, AxiosError } from 'axios';

import { CommonStorageService } from './../components/storage/common.service';

import {  AsyncAction } from './../types/app.types';
import {
  Stash,
} from './../components/storage/storage.types';

import {
  ADD_STASH_REQUEST,
  ADD_STASH_SUCCESS,
  ADD_STASH_FAILURE,
  UPDATE_STASHES_REQUEST,
  UPDATE_STASHES_SUCCESS,
  UPDATE_STASHES_FAILURE,
  DELETE_STASH_REQUEST,
  DELETE_STASH_SUCCESS,
  DELETE_STASH_FAILURE,
  GET_STASHES_FROM_USER_DATA,
} from './../constants/stashes.action.types';

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

export const deleteStashRequest = (): AnyAction => ({
  type: DELETE_STASH_REQUEST
});

export const deleteStashSuccess = (stash_id: number): AnyAction => ({
  payload: { stash_id },
  type: DELETE_STASH_SUCCESS
});

export const deleteStashFailure = (error: AxiosError): AnyAction => ({
  payload: error,
  type: DELETE_STASH_FAILURE
});

export const getStashesFromUserData = (stashes: Stash[]): AnyAction => ({
    payload: { stashes },
    type: GET_STASHES_FROM_USER_DATA
});

export const deleteStashAsync = (
  user_id: number,
  stash_id: number
): AsyncAction => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(deleteStashRequest());
    try {
      const response = await Axios.delete(
        `http://localhost:1337/api/v1.0/stashes/${user_id}/${stash_id}`
      );
      const deletedStash = response.data.data.batches.find(
        stash => (stash.stash_id = stash_id)
      );
      dispatch(deleteStashSuccess(deletedStash.stash_id));
    } catch (error) {
      dispatch(deleteStashFailure(error));
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
      console.log(response)
      console.log(newStashResponse)
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
