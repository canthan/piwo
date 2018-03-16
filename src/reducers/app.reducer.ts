import { AnyAction } from 'redux';
import initialAppState from './initialState';
import { AppActionTypes } from './../constants/actionTypes';
import { AppState, User } from './../types/app.types';

export function appReducer(
  state: AppState = initialAppState.app,
  action: AnyAction
) {
  const { payload } = action;
  switch (action.type) {
    case AppActionTypes.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        loggedIn: action.loggedIn,
        user: action.user
      };
  }
}

export default appReducer;
