import { ItemState, EmptyBatch } from './../components/storage/storage.types';
import { AnyAction } from 'redux';
import initialAppState from './initialState';
import { ItemActionTypes } from './../constants/actionTypes';

export function itemReducer( state: EmptyBatch = initialAppState.emptyBatch, action: AnyAction) {
  const { payload } = action;
  switch (action.type) {
    case ItemActionTypes.SAVE_STASH_REQUEST:
      return {
        ...state,
      };
      case ItemActionTypes.SAVE_STASH_SUCCESS:
      return {
        ...state,
        stashes: [...action.stashes],
      };
      case ItemActionTypes.SAVE_STASH_FAILURE:
        return {
          ...state,
          error: action.error,
        };
    default:
      return state;
  }
}

export default itemReducer;