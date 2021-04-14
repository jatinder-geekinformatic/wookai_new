import {
  GET_COUNTRIES,
  SET_COUNTRIES,
  API_ERROR,
} from './actionTypes';
export const getCountries = () => {
  return {
    type: GET_COUNTRIES,
    payload: {},
  };
};

export const setCountries = (data) => {
  return {
    type: SET_COUNTRIES,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
