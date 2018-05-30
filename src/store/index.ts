import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { initialStashesState } from '../reducers/stashes.reducer';
import { initialStorageState } from '../reducers/storage.reducer';
import { initialAppState } from '../reducers/app.reducer';


const initialState = {
  ...initialAppState,
  ...initialStorageState,
  ...initialStashesState,
}

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));