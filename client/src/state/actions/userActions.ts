
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT,
  SET_USER,
  SET_ERROR,
} from "../constants/userConstants";

export interface Action {
  type: any;
  payload: {
    email: any;
    fullName: any;
  };
}

export const setUserActionCreator = (email: string) => {
  return {
    type: SET_USER,
    payload: email,
  };
};

export const loginRequestActionCreator = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const loginSuccessActionCreator = () => {
  return {
    type: USER_LOGIN_SUCCESS,
  };
};

export const loginFailActionCreator = (error: string) => {
  return {
    type: USER_LOGIN_FAIL,
    action: error,
  };
};

export const signUpRequestActionCreator = () => {
  return {
    type: USER_SIGNUP_REQUEST,
  };
};

export const signUpSuccessActionCreator = () => {
  return {
    type: USER_SIGNUP_SUCCESS,
  };
};

export const signUpFailActionCreator = (error: string) => {
  return {
    type: USER_SIGNUP_FAIL,
    action: error,
  };
};

export const logoutActionCreator = () => {
  return {
    type: USER_LOGOUT
  }
}

export const setErrorActionCreator = (error: string) => {
  return {
    type: SET_ERROR,
    payload: error
  }
}

// const signUp = (fullName: any, email: any, password: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
//     dispatch({ type: USER_SIGNUP_REQUEST });
//     try {
//       const { data } = await Axios.post('/signup', { fullName, email, password });
//       const actionPayload = { email, fullName: fullName };
//       dispatch({ type: USER_SIGNUP_SUCCESS, payload: actionPayload });

//     } catch (error) {
//       dispatch({ type: USER_SIGNUP_FAIL, payload: error.message });
//     }
//   };

// const login = async (email: any, password: any, dispatch: (arg0: { type: string; payload?: any; }) => void) => {
//     const copyEmail = email;
//     dispatch({ type: USER_LOGIN_REQUEST });
//     try {
//       const {data} = await Axios.post('/login', { email: copyEmail, password });
//       console.log('query result',data);
//       const { email, fullName } = data.doc;
//       dispatch({ type: USER_LOGIN_SUCCESS, payload: {email: copyEmail, fullName} });
//     } catch (error) {
//       dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
//     }
//   };

//   const logout = () => (dispatch: (arg0: { type: any; }) => void) => {
//     Cookie.remove('userInfo');
//     dispatch({ type: USER_LOGOUT });
//   };
// export { signUp, login, logout };
