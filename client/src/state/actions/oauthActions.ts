// import Axios from 'axios';
import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL, SET_ERROR,
} from '../constants/oauthConstants';


export interface Action {
    type: any;
    payload: {
        email: any;
    };
}

export const OauthLoginRequestActionCreator = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const OauthLoginSuccessActionCreator = () => {
  return {
    type: USER_LOGIN_SUCCESS,
  };
};

export const OauthLoginFailActionCreator = (error: string) => {
  return {
    type: USER_LOGIN_FAIL,
    action: error,
  };
};

export const OauthSetErrorActionCreator = (error: string) => {
  return {
    type: SET_ERROR,
    payload: error
  }
};
// export const signIn = async (email: any, password: any, dispatch: (arg0: { type: string; payload?: any; }) => void) => {
//     const copyEmail = email;
//     dispatch({ type: USER_LOGIN_REQUEST });
//     try {
//       const {data} = await Axios.post('/oauth-callback', { email: copyEmail, password });
//       const { email} = data.doc;
//       dispatch({ type: USER_LOGIN_SUCCESS, payload: {email: copyEmail} });  
//     } catch (error) {
//       dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
//     }
//   };
