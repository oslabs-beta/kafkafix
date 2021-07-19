import * as types from "../constants/userConstants";
import { Action } from "../actions/userActions";

export interface UserState {
  email: string;
  signupLoading: boolean;
  LOGINLoading: boolean;
  error: boolean;
  preferences: any;
}

const initialState: UserState = {
  email: "",
  signupLoading: false,
  LOGINLoading: false,
  error: false,
  preferences: null,
};

//
export const userReducer = (
  state: UserState = initialState,
  action: Action
) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        email: action.payload,
      };
    case types.USER_LOGIN_REQUEST:
      return { ...state, LOGINLoading: true };
    case types.USER_LOGIN_SUCCESS:
      console.log("action payload for sucessful LOGIN", action.payload);
      return { ...state, LOGINloading: false };
    case types.USER_LOGIN_FAIL:
      return { ...state, LOGINLoading: false, error: action.payload };
    case types.USER_SIGNUP_REQUEST:
      return { ...state, signupLoading: true };
    case types.USER_SIGNUP_SUCCESS:
      return { ...state, signupLoading: false };
    case types.USER_SIGNUP_FAIL:
      return { ...state, signupLoading: false, error: action.payload };
    case types.USER_LOGOUT:
      console.log('reached user logout');
      console.log('initial state ', initialState);
      return {...initialState};
    default:
      return state;
  }
};

// export { userReducer };
