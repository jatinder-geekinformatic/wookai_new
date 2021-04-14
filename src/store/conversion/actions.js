import {
  GET_CONVERSIONS,
  SET_CONVERSIONS,
  SET_CONVERSION,
  ADD_CONVERSION,
  EMPTY_CONVERSION,
  DELETE_CONVERSION,
  EDIT_CONVERSION,
  UPDATE_CONVERSION,
  SET_CONVERSION_FILTER,
  API_ERROR,
} from "./actionTypes";
export const getConversions = () => {
  return {
    type: GET_CONVERSIONS,
    payload: {},
  };
};

export const setConversions = (data) => {
  return {
    type: SET_CONVERSIONS,
    payload: data,
  };
};

export const setConversion = (data) => {
  return {
    type: SET_CONVERSION,
    payload: data,
  };
};

export const addConversion = (history) => {
  return {
    type: ADD_CONVERSION,
    payload: {history},
  };
};

export const emptyConversion = () => {
  return {
    type: EMPTY_CONVERSION,
    payload: {},
  };
};

export const deleteConversion = (id) => {
  return {
    type: DELETE_CONVERSION,
    payload: { id },
  };
};

export const editConversion = (id) => {
  return {
    type: EDIT_CONVERSION,
    payload: { id },
  };
};

export const updateConversion = (history, id) => {
  return {
    type: UPDATE_CONVERSION,
    payload: { history, id },
  };
};

export const setConversionFilter = (data) => {
  return {
    type: SET_CONVERSION_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
