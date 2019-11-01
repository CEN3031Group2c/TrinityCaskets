// Reducers take in 'actions' and then decide what part of the 'store' to update
// This reducer handles login errors

import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
    msg: {},
    status: null,
    id: null
}

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