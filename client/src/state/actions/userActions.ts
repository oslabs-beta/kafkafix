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
} from '../constants/userConstants';

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
		type: USER_LOGOUT,
	};
};

export const setErrorActionCreator = (error: string) => {
	return {
		type: SET_ERROR,
		payload: error,
	};
};
