import {applyMiddleware, combineReducers, createStore} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger} from "redux-logger/src";
import thunkMiddleware from "redux-thunk";

import * as reducers from "./reducers";

const logger =  createLogger();
const composeEnhancers = composeWithDevTools;

export function configureStore(preloadedState) {
    const reducer = combineReducers(reducers);
    const middlewares = [thunkMiddleware, logger];
    const store = createStore(
        reducer,
        preloadedState,
        composeEnhancers(applyMiddleware(...middlewares)),
    );
    return store;
}
