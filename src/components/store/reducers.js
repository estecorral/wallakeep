import * as TYPES from './types';
import { combineReducers } from 'redux';

const initialState = {
    user: {},
    adds: [],
    ui: {
        isFetching: false,
        error: null,
    },
    add: {},
    newAdd: {},
};

 // Reducer user:
export const user = (state = initialState.user, action) => {
    if (action.type === TYPES.SET_USER) {
        return action.user;
    } else {
        return state;
    }
};

// Reducer recuperar ADDs:
export const adds = (state = initialState.adds, action) => {
    if (action.type === TYPES.FETCH_ADDS_SUCCESS) {
        return action.adds;
    } else {
        return state;
    }
};

// Reducer gestion de un anuncio
export const add = (state = initialState.add, action) => {
    switch (action.type) {
        case TYPES.FETCH_GET_ADD:
            return action.add;
        case TYPES.FETCH_EDIT_ADD:
            return state.add;
        case TYPES.FETCH_NEW_ADD:
            return state.add;
        case TYPES.HANDLE_CHANGE_ADD:
            return action.add;
        default:
            return state;
    }

};

export const ui = ( state = initialState.ui, action) => {
    switch (action.type) {
        case TYPES.FETCH_ADDS_REQUEST:
            return {
                isFetching: true,
                error: null,
            };
        case TYPES.FETCH_ADDS_FAILURE:
            return {
                isFetching: false,
                error: action.error,
            };
        case TYPES.FETCH_ADDS_SUCCESS:
            return {
                isFetching: false,
                error: null,
            };
        default:
            return state;
    }
};

const reducer = combineReducers({
    user,
    adds,
    ui,
    add,
});

export default reducer;