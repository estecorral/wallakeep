import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import * as reducers from "./reducers";

export function configureStore(preloadedState) {
    const reducer = combineReducers(reducers);
    const store = createStore(reducer, preloadedState, composeWithDevTools());
    return store;
}
