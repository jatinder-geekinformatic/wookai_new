import {
  GET_BUSINESS_PROFILES,
  SET_BUSINESS_PROFILES,
  SET_BUSINESS_PROFILE,
  ADD_BUSINESS_PROFILE,
  EMPTY_BUSINESS_PROFILE,
  DELETE_BUSINESS_PROFILE,
  EDIT_BUSINESS_PROFILE,
  UPDATE_BUSINESS_PROFILE,
  SET_BUSINESS_PROFILE_FILTER,
  API_ERROR,
} from './actionTypes';
export const getBusinessProfiles = () => {
  return {
    type: GET_BUSINESS_PROFILES,
    payload: {},
  };
};

export const setBusinessProfiles = (data) => {
  return {
    type: SET_BUSINESS_PROFILES,
    payload: data,
  };
};

export const setBusinessProfile = (data) => {
  return {
    type: SET_BUSINESS_PROFILE,
    payload: data,
  };
};

export const addBusinessProfile = () => {
  return {
    type: ADD_BUSINESS_PROFILE,
    payload: {},
  };
};

export const emptyBusinessProfile = () => {
  return {
    type: EMPTY_BUSINESS_PROFILE,
    payload: {},
  };
};

export const deleteBusinessProfile = (id) => {
  return {
    type: DELETE_BUSINESS_PROFILE,
    payload: { id },
  };
};

export const editBusinessProfile = (id) => {
  return {
    type: EDIT_BUSINESS_PROFILE,
    payload: { id },
  };
};

export const updateBusinessProfile = (id) => {
  return {
    type: UPDATE_BUSINESS_PROFILE,
    payload: { id },
  };
};

export const setBusinessProfileFilter = (data) => {
  return {
    type: SET_BUSINESS_PROFILE_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
