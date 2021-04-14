import {
  GET_VENDOR_ITEMS,
  SET_VENDOR_ITEMS,
  SET_VENDOR_ITEM,
  ADD_VENDOR_ITEM,
  EMPTY_VENDOR_ITEM,
  DELETE_VENDOR_ITEM,
  EDIT_VENDOR_ITEM,
  UPDATE_VENDOR_ITEM,
  SET_VENDOR_ITEM_FILTER,
  API_ERROR,
} from "./actionTypes";
export const getVendorItems = (vendorId) => {
  return {
    type: GET_VENDOR_ITEMS,
    payload: {vendorId},
  };
};

export const setVendorItems = (data) => {
  return {
    type: SET_VENDOR_ITEMS,
    payload: data,
  };
};

export const setVendorItem = (data) => {
  return {
    type: SET_VENDOR_ITEM,
    payload: data,
  };
};

export const addVendorItem = () => {
  return {
    type: ADD_VENDOR_ITEM,
    payload: {},
  };
};

export const emptyVendorItem = () => {
  return {
    type: EMPTY_VENDOR_ITEM,
    payload: {},
  };
};

export const deleteVendorItem = (id) => {
  return {
    type: DELETE_VENDOR_ITEM,
    payload: { id },
  };
};

export const editVendorItem = (id) => {
  return {
    type: EDIT_VENDOR_ITEM,
    payload: { id },
  };
};

export const updateVendorItem = (id) => {
  return {
    type: UPDATE_VENDOR_ITEM,
    payload: { id },
  };
};

export const setVendorItemFilter = (data) => {
  return {
    type: SET_VENDOR_ITEM_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
