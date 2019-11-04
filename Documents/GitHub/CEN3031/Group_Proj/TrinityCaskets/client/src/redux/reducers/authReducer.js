// Reducers take in 'actions' and then decide what part of the 'store' to update
// This reducer handles user authentication

// All the different types needed for authentication
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    // Get the token from local storage
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    // We're getting the user, so needs to start off empty
    user: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        // Getting the user from the backend
        case USER_LOADING:
            return {
                // Return current state + isLoading
                ...state,
                isLoading: true
            };
        // When we've finished loading the user from the backend
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                // Send the user itself, since we've finished loading it
                user: action.payload
            };
        // Login success = register success
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            // Get the token since we are successful
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            // Get rid of the token since we are unsuccessful
            localStorage.removeItem('token');
            return {
                // Clear everything out since we failed
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}