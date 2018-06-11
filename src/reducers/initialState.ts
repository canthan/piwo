import { BatchesState, EmptyBatch, StashesState } from './../components/storage/storage.types';
import { AppState } from './../types/app.types';

export interface OverallAppState {
  app: AppState;
  batches: BatchesState;
  stashes: StashesState;
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
  batches: {
    batches: [],
  },
  stashes: {
    stashes: []
  }
};

export default initialAppState;
