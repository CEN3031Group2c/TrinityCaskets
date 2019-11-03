// Reducers take in 'actions' and then decide what part of the 'store' to update
// This reducer handles login errors

import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

// Any errors we need to display
const initialState = {
    msg: {},
    status: null,
    id: null
};

// Take in a state and an action (get errors or clear errors)
export default function(state = initialState, action) {
    // Decide action type
    switch(action.type) {
        // Check for errors
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
        // Get rid of old errors if problem is fixed
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id: null
            };
        default:
            return state;
    }
}