import Axios from 'axios';
import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL, 
} from '../constants/oauthConstants';


export interface Action {
    type: any;
    payload: {
        email: any;
    };
}


export const signIn = async (email: any, password: any, dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    const copyEmail = email;
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
      const {data} = await Axios.post('/oauth-callback', { email: copyEmail, password });
      console.log('query result',data);
      const { email} = data.doc;
      dispatch({ type: USER_LOGIN_SUCCESS, payload: {email: copyEmail} });  
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
    }
  };
