// Redux is for updating components in relation to each other (allows user to only do certain actions if logged in)
// Store is all the application's states/data. The main 'hub'

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleWare))
);

export default store;