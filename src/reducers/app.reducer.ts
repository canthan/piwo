import { AnyAction } from 'redux';
import initialAppState from './initialState';
import { AppActionTypes } from './../constants/actionTypes';
import { AppState, User } from './../types/app.types';

export function appReducer( state: AppState = initialAppState.app, action: AnyAction) {
  // console.log(action.data);
  // console.log(action);
  // console.log(state);
  switch (action.type) {
    case AppActionTypes.GET_USER_DATA_SUCCESS:
      const { user_id, username, firstname, surname, email } = action.data;
      return {
        ...state,
        loaded: action.loaded,
        loggedIn: action.loggedIn,
        user: {
          user_id: user_id,
          username: username,
          firstname: firstname,
          surname: surname,
          email: email,
        },
      };
    default:
      return state;
  }
}

export default appReducer;
