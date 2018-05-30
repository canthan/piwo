import { Batch, Stash } from './../components/storage/storage.types';
import { AnyAction } from 'redux';
import { ItemState, EmptyBatch } from './../components/storage/storage.types';
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
  DELETE_STASHES_FROM_BATCH,
} from './../constants/stashes.action.types';

import { CommonStorageService } from '../components/storage/common.service';
import { createConditionalSliceReducer } from './utils';
import InitialState from '././initialState';

export const initialStashesState = {
  stashes: {
    stashes: []
  }
};

const stashesReducerMapping = () => ({
  [DELETE_STASH_REQUEST]: state => ({ ...state }),
  [ADD_STASH_REQUEST]: state => ({ ...state }),
  [UPDATE_STASHES_REQUEST]: state => ({ ...state }),

  [DELETE_STASH_SUCCESS]: (state, { stash_id }) => ({
    ...state,
    ...{ stashes: state.stashes.filter(stash => stash.stash_id !== stash_id) }
  }),
  [ADD_STASH_SUCCESS]: (state, { newStash }) => ({
    ...state,
    ...{
      stashes: [...state.stashes, newStash]
    }
  }),
  [UPDATE_STASHES_SUCCESS]: (state, { updatedStashes }) => ({
    ...state,
    ...{
      // stashes: [...state.stashes, ...updatedStashes]// do przerobienia
      stashes: [
        ...state.stashes.map(stash =>
          updatedStashes.forEach(
            uStash =>
              (stash = uStash.stash_id === stash.stash_id ? uStash : stash)
          )
        )
      ] // do przerobienia
    }
  }),
  [DELETE_STASHES_FROM_BATCH]: (state, { batch_id }) => ({
    ...state,
    ...{ stashes: [...state.stashes.filter(stash => stash.batch_id !== batch_id)] }
  }),
  [GET_STASHES_FROM_USER_DATA]: (state, { stashes }) => ({
    ...state,
    ...{ stashes: [...stashes] }
  }),

  [ADD_STASH_FAILURE]: (state, payload) => ({
    ...state,
    ...{ error: payload }
  }),
  [UPDATE_STASHES_FAILURE]: (state, payload) => ({
    ...state,
    ...{ error: payload }
  }),
  [DELETE_STASH_FAILURE]: (state, payload) => ({
    ...state,
    ...{ error: payload }
  })
});

export const stashesReducer = createConditionalSliceReducer(
  'stashes',
  stashesReducerMapping(),
  { stashes: InitialState.stashes }
);
