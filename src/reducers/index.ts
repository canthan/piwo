import { combineReducers } from 'redux';
import { OverallAppState } from './initialState';
import { appReducer } from './app.reducer';
import { storageReducer } from './storage.reducer';
// import { stashReducer } from './stash.reducer';

const rootReducer = combineReducers<OverallAppState>({
  app: appReducer,
  storage: storageReducer,
});

export default rootReducer;
