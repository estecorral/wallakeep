import * as TYPES from './types';

export const setUser = user => ({
   type: TYPES.SET_USER,
    user,
});

export const fetchAddRequest = () => ({
   type: TYPES.FETCH_ADDS_REQUEST,
});

export const fetchAddFailure = error => ({
    type: TYPES.FETCH_ADDS_FAILURE,
    error,
});

export const fetchAddSuccess = adds => ({
    type: TYPES.FETCH_ADDS_SUCCESS,
    adds,
});

export const fetchGetAddSuccess = add => ({
    type: TYPES.FETCH_GET_ADD,
    add,
});

export const fetchUpdateAdd = () => ({
    type: TYPES.FETCH_EDIT_ADD,
});

export const fetchNewAdd = () => ({
    type: TYPES.FETCH_NEW_ADD,
});

export const hadleChangeAdd = add => ({
   type: TYPES.HANDLE_CHANGE_ADD,
   add,
});