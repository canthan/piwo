import { combineReducers } from 'redux';
import { OverallAppState } from './initialState';
import { appReducer } from './app.reducer';
import { storageReducer } from './storage.reducer';
import { itemReducer } from './item.reducer';

const rootReducer = combineReducers<OverallAppState>({
  app: appReducer,
  storage: storageReducer,
  emptyBatch: itemReducer,
});

export default rootReducer;
