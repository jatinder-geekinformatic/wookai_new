import {
  GET_DEFAULT_PROFILES,
  SET_DEFAULT_PROFILES,
  SET_DEFAULT_PROFILE,
  ADD_DEFAULT_PROFILE,
  EMPTY_DEFAULT_PROFILE,
  DELETE_DEFAULT_PROFILE,
  EDIT_DEFAULT_PROFILE,
  UPDATE_DEFAULT_PROFILE,
  SET_DEFAULT_PROFILE_FILTER,
  GET_DEFAULT_PROFILES_LIST,
  SET_DEFAULT_PROFILES_LIST,
  API_ERROR,
} from './actionTypes';
export const getDefaultProfiles = () => {
  return {
    type: GET_DEFAULT_PROFILES,
    payload: {},
  };
};

export const setDefaultProfiles = (data) => {
  return {
    type: SET_DEFAULT_PROFILES,
    payload: data,
  };
};

export const setDefaultProfile = (data) => {
  return {
    type: SET_DEFAULT_PROFILE,
    payload: data,
  };
};

export const addDefaultProfile = () => {
  return {
    type: ADD_DEFAULT_PROFILE,
    payload: {},
  };
};

export const emptyDefaultProfile = () => {
  return {
    type: EMPTY_DEFAULT_PROFILE,
    payload: {},
  };
};

export const deleteDefaultProfile = (id) => {
  return {
    type: DELETE_DEFAULT_PROFILE,
    payload: { id },
  };
};

export const editDefaultProfile = (id) => {
  return {
    type: EDIT_DEFAULT_PROFILE,
    payload: { id },
  };
};

export const updateDefaultProfile = (id) => {
  return {
    type: UPDATE_DEFAULT_PROFILE,
    payload: { id },
  };
};

export const setDefaultProfileFilter = (data) => {
  return {
    type: SET_DEFAULT_PROFILE_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const getDefaultProfilesList = () => {
  return {
    type: GET_DEFAULT_PROFILES_LIST,
    payload: {},
  };
};

export const setDefaultProfilesList = (data) => {
  return {
    type: SET_DEFAULT_PROFILES_LIST,
    payload: data,
  };
};