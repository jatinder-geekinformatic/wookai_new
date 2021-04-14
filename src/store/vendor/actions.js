import {
  GET_VENDORS,
  SET_VENDORS,
  GET_VENDORS_LIST,
  SET_VENDORS_LIST,
  SET_VENDOR,
  ADD_VENDOR,
  EMPTY_VENDOR,
  DELETE_VENDOR,
  EDIT_VENDOR,
  UPDATE_VENDOR,
  SET_VENDOR_FILTER,
  API_ERROR,
} from "./actionTypes";

export const getVendors = () => {
  return {
    type: GET_VENDORS,
    payload: {},
  };
};

export const setVendors = (data) => {
  return {
    type: SET_VENDORS,
    payload: data,
  };
};

export const getVendorsList = () => {
  return {
    type: GET_VENDORS_LIST,
    payload: {},
  };
};

export const setVendorsList = (data) => {
  return {
    type: SET_VENDORS_LIST,
    payload: data,
  };
}

export const setVendor = (data) => {
  return {
    type: SET_VENDOR,
    payload: data,
  };
};

export const addVendor = () => {
  return {
    type: ADD_VENDOR,
    payload: {},
  };
};

export const emptyVendor = () => {
  return {
    type: EMPTY_VENDOR,
    payload: {},
  };
};

export const deleteVendor = (id) => {
  return {
    type: DELETE_VENDOR,
    payload: { id },
  };
};

export const editVendor = (id) => {
  return {
    type: EDIT_VENDOR,
    payload: { id },
  };
};

export const updateVendor = (id) => {
  return {
    type: UPDATE_VENDOR,
    payload: { id },
  };
};

export const setVendorFilter = (data) => {
  return {
    type: SET_VENDOR_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
