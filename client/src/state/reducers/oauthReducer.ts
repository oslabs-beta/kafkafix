import * as types from '../constants/oauthConstants';
import { Action } from '../actions/oauthActions';

const initialState = {
    email: '',
    password: '',
    authenticating: false,
    error: false,
};
export const userReducer = (state = initialState, action: Action) => {
    switch (action.type) { 
        case types.USER_LOGIN_REQUEST:
            return { ...state, authenticating: true };
        case types.USER_LOGIN_SUCCESS:
            return { ...state, authenticating: false, email: action.payload.email};
        case types.USER_LOGIN_FAIL:
            return { ...state, authenticating: false, error: action.payload };
        
    }
}