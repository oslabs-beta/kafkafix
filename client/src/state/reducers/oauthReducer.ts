import * as types from '../constants/oauthConstants';
import { Action } from '../actions/oauthActions';

export interface OauthState {
    email: string;
    LOGINLoading: boolean;
    error: string;
    preferences: any;
  }

const initialState: OauthState = {
    email: "",
    // password: '',
  LOGINLoading: false,
  error: "",
  preferences: null,
};
export const userReducer = (
    state: OauthState = initialState,
    action: Action) => {
    switch (action.type) {
        case types.SET_ERROR: 
      return {
        ...state,
        error: action.payload
      }
        case types.USER_LOGIN_REQUEST:
            return { ...state, authenticating: true };
        case types.USER_LOGIN_SUCCESS:
            console.log('action payload for sucessful LOGIN', action.payload);
            return { ...state, authenticating: false, email: action.payload.email};
        case types.USER_LOGIN_FAIL:
            return { ...state, authenticating: false, error: action.payload };
        
    }
}