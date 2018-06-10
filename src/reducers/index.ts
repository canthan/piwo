import { appReducer } from './app.reducer';
import { stashesReducer } from './stashes.reducer';
import { batchesReducer } from './batches.reducer';
import { reduceReducers } from './utils';

const rootReducer = reduceReducers(batchesReducer, appReducer, stashesReducer);

export default rootReducer;
