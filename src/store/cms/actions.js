import {
  GET_CMS,
  SET_CMS,
  SET_CM,
  ADD_CM,
  EMPTY_CM,
  DELETE_CM,
  EDIT_CM,
  UPDATE_CM,
  SET_CMS_FILTER,
  API_ERROR,
} from './actionTypes';
export const getCms = () => {
  return {
    type: GET_CMS,
    payload: {},
  };
};

export const setCms = (data) => {
  return {
    type: SET_CMS,
    payload: data,
  };
};

export const setCm = (data) => {
  return {
    type: SET_CM,
    payload: data,
  };
};

export const addCm = () => {
  return {
    type: ADD_CM,
    payload: {},
  };
};

export const emptyCm = () => {
  return {
    type: EMPTY_CM,
    payload: {},
  };
};

export const deleteCm = (id) => {
  return {
    type: DELETE_CM,
    payload: { id },
  };
};

export const editCm = (id) => {
  return {
    type: EDIT_CM,
    payload: { id },
  };
};

export const updateCm = (id) => {
  return {
    type: UPDATE_CM,
    payload: { id },
  };
};

export const setCmsFilter = (data) => {
  return {
    type: SET_CMS_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
