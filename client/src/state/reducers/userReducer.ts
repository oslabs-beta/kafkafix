import * as types from '../constants/userConstants';
import { Action } from '../actions/userActions';

const initialState = {
    email: '',
    password: '',
    fullName: '',
    signupLoading: false, 
    LOGINLoading: false,
    error: false,
};
//    
export const userReducer = (state = initialState, action: Action) => {
    switch(action.type){
    case types.CREATE_NEWUSER: return {
      ...state,
      email: action.payload.email, // have we saved userInput email in some var?
      // password: state.password.anchor, // have we saved userInput password in some var?
      fullname: action.payload.fullName
    };
    case types.USER_LOGIN_REQUEST:
      return {...state, LOGINLoading: true };
    case types.USER_LOGIN_SUCCESS:
      console.log('action payload for sucessful LOGIN', action.payload);
      return {...state, LOGINloading: false, email: action.payload.email, fullName: action.payload.fullName};
    case types.USER_LOGIN_FAIL:
        return { ...state, LOGINLoading: false, error: action.payload };
    case types.USER_SIGNUP_REQUEST:
        return {...state, signupLoading: true };
    case types.USER_SIGNUP_SUCCESS:
        return {...state, signupLoading: false, email: action.payload.email, fullName: action.payload.fullName };
    case types.USER_SIGNUP_FAIL:
            return { ...state, signupLoading: false, error: action.payload };
            default: 
            return state;
          }
};
        
// export { userReducer };