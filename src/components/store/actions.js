import * as TYPES from './types';
import {getAds} from "../../API/api";


export const fetchAdds = (myTag, price, name, type) => {
  return async function (dispatch, getState) {
          dispatch(fetchAddRequest());
          try {
              await getAds(myTag, price, name, type).then(adds => {
                  dispatch(fetchAddSuccess(adds));
              });
          } catch (e) {
              dispatch(fetchAddFailure(e));
          }
  }
};

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