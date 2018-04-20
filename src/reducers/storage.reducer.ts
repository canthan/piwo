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
    case StorageActionTypes.ADD_BATCH_REQUEST:
    case StorageActionTypes.DELETE_BATCH_REQUEST:
    case StorageActionTypes.GET_USER_STORAGE_REQUEST:
      return {
        ...state
      };
    case StorageActionTypes.ADD_BATCH_SUCCESS:
    case StorageActionTypes.GET_USER_STORAGE_SUCCESS:
    case AppActionTypes.GET_BATCHES_FROM_USER_DATA:
      return {
        ...state,
        batches: action.batches
      };

    case StorageActionTypes.DELETE_BATCH_SUCCESS:
      return {
        ...state,
        batches: state.batches.filter(
          batch => batch.batch_id !== action.batch.batch_id
        )
      };

    case StorageActionTypes.ADD_BATCH_FAILURE:
    case StorageActionTypes.DELETE_BATCH_FAILURE:
    case StorageActionTypes.GET_USER_STORAGE_FAILURE:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
}
