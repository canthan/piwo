import { combineReducers } from 'redux';
import { AppStateInterface } from './initialState';
import { appReducer } from './app.reducer';
import { storageReducer } from './storage.reducer';
import { itemReducer } from './item.reducer';

const rootReducer = combineReducers<AppStateInterface>({
  app: appReducer,
  storage: storageReducer,
  item: itemReducer,
});

export default rootReducer;
