import { appReducer } from './app.reducer';
import { stashesReducer } from './stashes.reducer';
import { storageReducer } from './storage.reducer';
import { reduceReducers } from './utils';

const rootReducer = reduceReducers(storageReducer, appReducer, stashesReducer);

export default rootReducer;
