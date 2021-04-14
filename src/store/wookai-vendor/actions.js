import {
  GET_WOOKAI_VENDORS,
  SET_WOOKAI_VENDORS,
  SET_WOOKAI_VENDOR,
  ADD_WOOKAI_VENDOR,
  EMPTY_WOOKAI_VENDOR,
  DELETE_WOOKAI_VENDOR,
  EDIT_WOOKAI_VENDOR,
  UPDATE_WOOKAI_VENDOR,
  SET_WOOKAI_VENDOR_FILTER,
  API_ERROR,
} from "./actionTypes";
export const getWookaiVendors = () => {
  return {
    type: GET_WOOKAI_VENDORS,
    payload: {},
  };
};

export const setWookaiVendors = (data) => {
  return {
    type: SET_WOOKAI_VENDORS,
    payload: data,
  };
};

export const setWookaiVendor = (data) => {
  return {
    type: SET_WOOKAI_VENDOR,
    payload: data,
  };
};

export const addWookaiVendor = () => {
  return {
    type: ADD_WOOKAI_VENDOR,
    payload: {},
  };
};

export const emptyWookaiVendor = () => {
  return {
    type: EMPTY_WOOKAI_VENDOR,
    payload: {},
  };
};

export const deleteWookaiVendor = (id) => {
  return {
    type: DELETE_WOOKAI_VENDOR,
    payload: { id },
  };
};

export const editWookaiVendor = (id) => {
  return {
    type: EDIT_WOOKAI_VENDOR,
    payload: { id },
  };
};

export const updateWookaiVendor = (id) => {
  return {
    type: UPDATE_WOOKAI_VENDOR,
    payload: { id },
  };
};

export const setWookaiVendorFilter = (data) => {
  return {
    type: SET_WOOKAI_VENDOR_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
