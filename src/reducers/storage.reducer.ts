import { StorageState } from './../components/storage/storage.types';
import { AnyAction } from 'redux';
import initialAppState from './initialState';
import { StorageActionTypes, AppActionTypes } from './../constants/actionTypes';
import { CommonStorageService } from '../components/storage/common.service';

export function storageReducer(
  state: StorageState = initialAppState.storage,
  action: AnyAction
) {
  const commonStorageService: CommonStorageService = new CommonStorageService();
  const { payload } = action;
  switch (action.type) {
    case StorageActionTypes.GET_USER_STORAGE_REQUEST:
    case StorageActionTypes.ADD_BATCH_REQUEST:
      return {
        ...state
      };
    case StorageActionTypes.GET_USER_STORAGE_SUCCESS:
      const batches = commonStorageService.formatDateForDisplay(action.data);
      commonStorageService.calculateQuantities(batches);
      return {
        ...state,
        batches
      };

    case StorageActionTypes.ADD_BATCH_SUCCESS:
      return {
        ...state,
        batches: [...action.data]
      };

    case StorageActionTypes.GET_USER_STORAGE_FAILURE:
    case StorageActionTypes.ADD_BATCH_FAILURE:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
}
