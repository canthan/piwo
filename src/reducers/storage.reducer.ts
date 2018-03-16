import { StorageState } from './../components/storage/storage.types';
import { AnyAction } from 'redux';
import initialAppState from './initialState';
import { StorageActionTypes } from './../constants/actionTypes';

export function storageReducer(
  state: StorageState = initialAppState.storage,
  action: AnyAction
) {
  const { payload } = action;
  switch (action.type) {
    case StorageActionTypes.GET_USER_STORAGE_SUCCESS:
      return {
        ...state,
        batches: [...action.batches],
      };
  }
}

export default storageReducer;
