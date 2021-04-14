import {
  GET_STATES,
  SET_STATES,
  API_ERROR,
} from './actionTypes';
export const getStates = () => {
  return {
    type: GET_STATES,
    payload: {},
  };
};

export const setStates = (data) => {
  return {
    type: SET_STATES,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
