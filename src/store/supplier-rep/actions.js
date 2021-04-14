import {
  GET_SUPPLIER_REPS,
  SET_SUPPLIER_REPS,
  SET_SUPPLIER_REP,
  ADD_SUPPLIER_REP,
  EMPTY_SUPPLIER_REP,
  DELETE_SUPPLIER_REP,
  EDIT_SUPPLIER_REP,
  UPDATE_SUPPLIER_REP,
  SET_SUPPLIER_REP_FILTER,
  API_ERROR,
} from "./actionTypes";
export const getSupplierReps = () => {
  return {
    type: GET_SUPPLIER_REPS,
    payload: {},
  };
};

export const setSupplierReps = (data) => {
  return {
    type: SET_SUPPLIER_REPS,
    payload: data,
  };
};

export const setSupplierRep = (data) => {
  return {
    type: SET_SUPPLIER_REP,
    payload: data,
  };
};

export const addSupplierRep = (history) => {
  return {
    type: ADD_SUPPLIER_REP,
    payload: { history },
  };
};

export const emptySupplierRep = () => {
  return {
    type: EMPTY_SUPPLIER_REP,
    payload: {},
  };
};

export const deleteSupplierRep = (id) => {
  return {
    type: DELETE_SUPPLIER_REP,
    payload: { id },
  };
};

export const editSupplierRep = (id) => {
  return {
    type: EDIT_SUPPLIER_REP,
    payload: { id },
  };
};

export const updateSupplierRep = (history, id) => {
  return {
    type: UPDATE_SUPPLIER_REP,
    payload: { id, history },
  };
};

export const setSupplierRepFilter = (data) => {
  return {
    type: SET_SUPPLIER_REP_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
