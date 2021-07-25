import * as types from '../constants/userConstants';
import { Action } from '../actions/userActions';

export interface UserState {
	email: string;
	signupLoading: boolean;
	LOGINLoading: boolean;
	error: string;
	preferences: any;
}

const initialState: UserState = {
	email: '',
	signupLoading: false,
	LOGINLoading: false,
	error: '',
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
		case types.SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case types.USER_LOGIN_REQUEST:
			return { ...state, LOGINLoading: true };
		case types.USER_LOGIN_SUCCESS:
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
			return { ...initialState };
		default:
			return state;
	}
};
