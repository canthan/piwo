import { combineReducers } from 'redux';
import { AppStateInterface } from './initialState';
import { appReducer } from './app.reducer';
import { storageReducer } from './storage.reducer';

const rootReducer = combineReducers<AppStateInterface>({
  app: appReducer,
  storage: storageReducer,
  // item: null,
});

export default rootReducer;
