import { SET_AD, EDIT_AD, UPDATE_AD, API_ERROR } from './actionTypes';

export const setAd = (data) => {
  return {
    type: SET_AD,
    payload: data,
  };
};

export const editAd = (id) => {
  return {
    type: EDIT_AD,
    payload: { id },
  };
};

export const updateAd = (id) => {
  return {
    type: UPDATE_AD,
    payload: { id },
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
