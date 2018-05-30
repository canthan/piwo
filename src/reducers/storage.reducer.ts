import { StorageState, Batch } from './../components/storage/storage.types';
import { AnyAction } from 'redux';
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
} from './../constants/storage.actions.types';
import {
  GET_BATCHES_FROM_USER_DATA,
} from './../constants/app.action.types';
import { CommonStorageService } from '../components/storage/common.service';
import { createConditionalSliceReducer } from './utils';

export const initialStorageState = {
  storage: {
    batches: [],
  },
}

const storageReducerMapping = () => ({
  [ADD_BATCH_REQUEST]: state => ({ ...state }),
  [DELETE_BATCH_REQUEST]: state => ({ ...state }),
  [EDIT_BATCH_DATA_REQUEST]: state => ({ ...state }),
  [ADD_STASH_REQUEST]: state => ({ ...state }),
  [UPDATE_STASHES_REQUEST]: state => ({ ...state }),
  [GET_USER_STORAGE_REQUEST]: state => ({ ...state }),
  [ADD_BATCH_SUCCESS]: (state, { newBatch }) => ({
    ...state,
    ...{ batches: [...state.batches, newBatch] }
  }),
  [EDIT_BATCH_DATA_SUCCESS]: (state, { editedBatch }) => {
    editedBatch.stashes = CommonStorageService.getStashesFromBatch([...state.batches], editedBatch.batch_id);
    return {
      ...state,
      ... {
        batches: [
          ...state.batches.filter(batch => batch.batch_id !== editedBatch.batch_id),
          editedBatch
        ],
      }
    }
  },
  [ADD_STASH_SUCCESS]: (state, { newStash }) => ({
    ...state,
    ...{ batches: CommonStorageService.addStashesToBatch([...state.batches], newStash) }
  }),
  [UPDATE_STASHES_SUCCESS]: (state, { updatedStashes }) => ({
    ...state,
    ...{ batches: CommonStorageService.updateStashesinBatch([...state.batches], updatedStashes) }
  }),
  [GET_USER_STORAGE_SUCCESS]: (state, { batches }) => ({
    ...state,
    ...{ batches: [...batches] }
  }),
  [GET_BATCHES_FROM_USER_DATA]: (state, { batches }) => ({
    ...state,
    ...{ batches: [...batches] }
  }),
  [DELETE_BATCH_SUCCESS]: (state, { batch_id }) => ({
    ...state,
    ...{ batches: state.batches.filter(batch => batch.batch_id !== batch_id) }
  }),
  [ADD_BATCH_FAILURE]: (state, payload) => ({
    ...state,
    ...{ error: payload }
  }),
  [DELETE_BATCH_FAILURE]: (state, payload) => ({
    ...state,
    ...{ error: payload }
  }),
  [EDIT_BATCH_DATA_FAILURE]: (state, payload) => ({
    ...state,
    ...{ error: payload }
  }),
  [ADD_STASH_FAILURE]: (state, payload) => ({
    ...state,
    ...{ error: payload }
  }),
  [UPDATE_STASHES_FAILURE]: (state, payload) => ({
    ...state,
    ...{ error: payload }
  }),
  [GET_USER_STORAGE_FAILURE]: (state, payload) => ({
    ...state,
    ...{ error: payload }
  }),
});

export const storageReducer = createConditionalSliceReducer(
  'storage',
  storageReducerMapping(),
  initialStorageState,
);
