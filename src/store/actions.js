import * as TYPES from './types';
import {getAds, getOneAd} from "../API/api";


export const fetchAdds = (myTag, price, name, type) => {
  return async function (dispatch, getState) {
          dispatch(fetchAddRequest());
          try {
              const ads = await getAds(myTag, price, name, type);
              dispatch(fetchAddSuccess(ads));
          } catch (e) {
              dispatch(fetchAddFailure(e));
          }
  }
};

export const fetchGetAdd = (idAdd) => {
    return async function (dispatch, getState) {
        dispatch(fetchGetAddRequest());
        try {
            const ad = await getOneAd(idAdd);
            dispatch(fetchGetAddSuccess(ad));
        } catch (e) {
            dispatch(fetchGetAddFailure(e));
        }
    }
}

export const setSession = (...args) => (dispatch, { history }) => {
    dispatch(setUser(...args));
};

export const unSetSession = () => (dispatch, { history }) => {
    dispatch(unSetUser());
};

export const setUser = user => ({
   type: TYPES.SET_USER,
    user,
});

export const unSetUser = () => ({
    type: TYPES.UNSET_USER,
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
    type: TYPES.FETCH_GET_ADD_SUCCESS,
    add,
});

export const fetchGetAddRequest = () => ({
    type: TYPES.FETCH_GET_ADD_REQUEST,
});

export const fetchGetAddFailure = error => ({
    type: TYPES.FETCH_GET_ADD_FAILURE,
    error,
});

export const fetchUpdateAdd = () => ({
    type: TYPES.FETCH_EDIT_ADD,
});

export const fetchNewAdd = () => ({
    type: TYPES.FETCH_NEW_ADD,
});