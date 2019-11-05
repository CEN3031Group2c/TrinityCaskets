// Simply brings together all our reducers into one easily accessible place

import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    error: errorReducer,
    auth: authReducer
});