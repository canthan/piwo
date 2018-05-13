export enum AppActionTypes {
  GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST',
  GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS',
  GET_USER_DATA_FAILURE = 'GET_USER_DATA_FAILURE',
  GET_BATCHES_FROM_USER_DATA = 'GET_BATCHES_FROM_USER_DATA',
}

export enum ItemActionTypes {
  SAVE_STASH_REQUEST = 'SAVE_STASH_REQUEST',
  SAVE_STASH_SUCCESS = 'SAVE_STASH_SUCCESS',
  SAVE_STASH_FAILURE = 'SAVE_STASH_FAILURE',
}

export enum StorageActionTypes {
  GET_USER_STORAGE_REQUEST = 'GET_USER_STORAGE_REQUEST',
  GET_USER_STORAGE_SUCCESS = 'GET_USER_STORAGE_SUCCESS',
  GET_USER_STORAGE_FAILURE = 'GET_USER_STORAGE_FAILURE',
  ADD_BATCH_REQUEST = 'ADD_BATCH_REQUEST',
  ADD_BATCH_SUCCESS = 'ADD_BATCH_SUCCESS',
  ADD_BATCH_FAILURE = 'ADD_BATCH_FAILURE',
  ADD_STASH_REQUEST = 'ADD_STASH_REQUEST',
  ADD_STASH_SUCCESS = 'ADD_STASH_SUCCESS',
  ADD_STASH_FAILURE = 'ADD_STASH_FAILURE',
  DELETE_BATCH_REQUEST = 'DELETE_BATCH_REQUEST',
  DELETE_BATCH_SUCCESS = 'DELETE_BATCH_SUCCESS',
  DELETE_BATCH_FAILURE = 'DELETE_BATCH_FAILURE',

}
