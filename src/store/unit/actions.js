import {
  GET_UNITS,
  SET_UNITS,
  GET_UNITS_LIST,
  SET_UNITS_LIST,
  SET_UNIT,
  ADD_UNIT,
  EMPTY_UNIT,
  DELETE_UNIT,
  EDIT_UNIT,
  UPDATE_UNIT,
  SET_UNIT_FILTER,
  API_ERROR,
} from "./actionTypes";

export const getUnits = () => {
  return {
    type: GET_UNITS,
    payload: {},
  };
};

export const setUnits = (data) => {
  return {
    type: SET_UNITS,
    payload: data,
  };
};

export const setUnit = (data) => {
  return {
    type: SET_UNIT,
    payload: data,
  };
};

export const addUnit = (history) => {
  return {
    type: ADD_UNIT,
    payload: { history },
  };
};

export const emptyUnit = () => {
  return {
    type: EMPTY_UNIT,
    payload: {},
  };
};

export const deleteUnit = (id) => {
  return {
    type: DELETE_UNIT,
    payload: { id },
  };
};

export const editUnit = (id) => {
  return {
    type: EDIT_UNIT,
    payload: { id },
  };
};

export const updateUnit = (history, id) => {
  return {
    type: UPDATE_UNIT,
    payload: { history, id },
  };
};

export const setUnitFilter = (data) => {
  return {
    type: SET_UNIT_FILTER,
    payload: data,
  };
};

export const getUnitsList = () => {
  return {
    type: GET_UNITS_LIST,
    payload: {},
  };
};

export const setUnitsList = (data) => {
  return {
    type: SET_UNITS_LIST,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
