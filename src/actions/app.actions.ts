import { Dispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppActionTypes } from './../constants/actionTypes';
import { AppState, User } from './../types/app.types';


function getUserDataRequest(): AnyAction {
  return {
    type: AppActionTypes.GET_USER_DATA_REQUEST,
  };
}

function getUserDataSuccess(data: User, loggedIn: boolean ): AnyAction {
  return {
    data,
    loggedIn,
    type: AppActionTypes.GET_USER_DATA_SUCCESS,
  };
}

function getUserDataFailure(): AnyAction {
  return {
    type: AppActionTypes.GET_USER_DATA_FAILURE,
    error: true,
  };
}
