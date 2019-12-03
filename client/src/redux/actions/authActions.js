import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

/*
We have four main methods here:
    -Load User
    -Register User
    -Login User
    -Logout user

They're all very similar, just with different reducers (updaters) called, and other minor differences
 */

// 1. Load User
export const loadUser = () => (dispatch, getState) => {
    // Call USER_LOADING from our authReducer, which just sets isLoading = true
    dispatch({ type: USER_LOADING });

    // Fetch the user. Pass in our token so we know which user
    axios.get('/api/authentication/user', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: USER_LOADED,
                // Data = token + user
                payload: res.data
            })
        )
        // If token is invalid
        .catch(err => {
            // Call our returnErrors(message, status) from errorActions
            dispatch(returnErrors(err.response.data, err.response.status));
            // Clear everything via AUTH_ERROR from authReducer
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// 2. Register User. Pass in (name, email, password)
export const register = ({ name, email, password, admin, items}) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body of data that we want to send
    // Need stringify to turn javascript to JSON
    const body = JSON.stringify({ name, email, password, admin, items});

    axios.post('/api/user', body, config)
        // If we passed, then register was successful and we can send the data
        .then(res =>
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        )
        // If we didn't pass, clear everything (REGISTER_FAIL), and return some errors
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
            );
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

// 3. Login User
export const login = ({ email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axios.post('/api/authentication', body, config)
        .then(res =>
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
            );
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

// 4. Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};


// Finally, just need to setup config/headers and the token
export const tokenConfig = getState => {
    // Get token from local storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            // Indicate we're sending JSON
            'Content-type': 'application/json'
        }
    };

    // If token exists, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};



export const registerA = ({ name, email, password, admin, items}) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body of data that we want to send
    // Need stringify to turn javascript to JSON
    const body = JSON.stringify({ name, email, password, admin, items});

    axios.post('/api/admin', body, config)
        // If we didn't pass, clear everything (REGISTER_FAIL), and return some errors
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
            );
            {console.log("It happen 3")}
        });
};