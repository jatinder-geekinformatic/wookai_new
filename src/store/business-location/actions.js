import {
  GET_BUSINESS_LOCATIONS,
  SET_BUSINESS_LOCATIONS,
  SET_BUSINESS_LOCATION,
  ADD_BUSINESS_LOCATION,
  EMPTY_BUSINESS_LOCATION,
  DELETE_BUSINESS_LOCATION,
  EDIT_BUSINESS_LOCATION,
  UPDATE_BUSINESS_LOCATION,
  SET_BUSINESS_LOCATION_FILTER,
  API_ERROR,
} from './actionTypes';
export const getBusinessLocations = () => {
  return {
    type: GET_BUSINESS_LOCATIONS,
    payload: {},
  };
};

export const setBusinessLocations = (data) => {
  return {
    type: SET_BUSINESS_LOCATIONS,
    payload: data,
  };
};

export const setBusinessLocation = (data) => {
  return {
    type: SET_BUSINESS_LOCATION,
    payload: data,
  };
};

export const addBusinessLocation = (history) => {
  return {
    type: ADD_BUSINESS_LOCATION,
    payload: {history},
  };
};

export const emptyBusinessLocation = () => {
  return {
    type: EMPTY_BUSINESS_LOCATION,
    payload: {},
  };
};

export const deleteBusinessLocation = (id) => {
  return {
    type: DELETE_BUSINESS_LOCATION,
    payload: { id },
  };
};

export const editBusinessLocation = (id) => {
  return {
    type: EDIT_BUSINESS_LOCATION,
    payload: { id },
  };
};

export const updateBusinessLocation = (id) => {
  return {
    type: UPDATE_BUSINESS_LOCATION,
    payload: { id },
  };
};

export const setBusinessLocationFilter = (data) => {
  return {
    type: SET_BUSINESS_LOCATION_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
