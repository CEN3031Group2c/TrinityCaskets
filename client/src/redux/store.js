// Store is all the application's states/data. It's the main 'hub'; it holds the whole state tree of the application

import { createStore, applyMiddleware, compose } from 'redux';
// Thunk is a piece of middleware I need
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// Initial state = empty
const initialState = {};

// Middleware we will use
const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleWare))
);

export default store;
