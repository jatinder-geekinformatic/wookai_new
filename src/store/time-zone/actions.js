import {
  GET_TIME_ZONES,
  SET_TIME_ZONES,
  API_ERROR,
} from './actionTypes';
export const getTimeZones = () => {
  return {
    type: GET_TIME_ZONES,
    payload: {},
  };
};

export const setTimeZones = (data) => {
  return {
    type: SET_TIME_ZONES,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
