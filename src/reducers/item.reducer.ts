import { ItemState } from './../components/storage/storage.types';
import { AnyAction } from 'redux';
import initialAppState from './initialState';
import { ItemActionTypes } from './../constants/actionTypes';

export function itemReducer( state: ItemState = initialAppState.item, action: AnyAction) {
  const { payload } = action;
  switch (action.type) {
    case ItemActionTypes.SAVE_STASH_SUCCESS:
      return {
        ...state,
        stashes: [...action.stashes],
      };
    default:
      return state;
  }
}

export default itemReducer;