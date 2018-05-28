import { appReducer } from './app.reducer';
import { storageReducer } from './storage.reducer';
import { reduceReducers } from './utils';

const rootReducer = reduceReducers(storageReducer, appReducer);

export default rootReducer;
