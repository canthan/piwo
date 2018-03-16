import { ItemState, StorageState } from './../components/storage/storage.types';
import { AppState } from './../types/app.types';

export interface AppStateInterface {
  app: AppState;
  storage: StorageState;
  item: ItemState;
}

const initialAppState: AppStateInterface = {
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
  item: {
    stashes: [],
    selected: undefined,
  }
};

export default initialAppState;
