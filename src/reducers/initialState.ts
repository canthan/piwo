import { StorageState, EmptyBatch } from './../components/storage/storage.types';
import { AppState } from './../types/app.types';

export interface OverallAppState {
  app: AppState;
  storage: StorageState;
  emptyBatch: EmptyBatch;
}

const initialAppState: OverallAppState = {
  app: {
    loaded: true,
    loggedIn: false,
    user: {
      user_id: 0,
      username: '',
      firstname: '',
      surname: '',
      email: '',
    }
  },
  storage: {
    batches: [],
  },
  emptyBatch: new EmptyBatch()
};

export default initialAppState;