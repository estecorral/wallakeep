import {applyMiddleware, combineReducers, createStore} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { createBrowserHistory} from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

import * as reducers from "./reducers";

const composeEnhancers = composeWithDevTools;

const createRootReducer = (history) => combineReducers({
   router: connectRouter(history),
   ...reducers
});

export const history = createBrowserHistory();

export function configureStore(preloadedState) {
    const reducer = createRootReducer(history);
    const middlewares = [routerMiddleware(history), thunkMiddleware];
    const store = createStore(
        reducer,
        preloadedState,
        composeEnhancers(applyMiddleware(...middlewares)),
    );
    return store;
}
