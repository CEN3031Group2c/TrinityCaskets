import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Return whatever errors we have
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
};

// Clear errors if necessary
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};