import {
  GET_ITEM_LOCATIONS,
  SET_ITEM_LOCATIONS,
  GET_ITEM_LOCATIONS_LIST,
  SET_ITEM_LOCATIONS_LIST,
  SET_ITEM_LOCATION,
  ADD_ITEM_LOCATION,
  EMPTY_ITEM_LOCATION,
  DELETE_ITEM_LOCATION,
  EDIT_ITEM_LOCATION,
  UPDATE_ITEM_LOCATION,
  SET_ITEM_LOCATION_FILTER,
  API_ERROR,
} from "./actionTypes";
export const getItemLocations = () => {
  return {
    type: GET_ITEM_LOCATIONS,
    payload: {},
  };
};

export const setItemLocations = (data) => {
  return {
    type: SET_ITEM_LOCATIONS,
    payload: data,
  };
};

export const getItemLocationsList = () => {
  return {
    type: GET_ITEM_LOCATIONS_LIST,
    payload: {},
  };
};

export const setItemLocationsList = (data) => {
  return {
    type: SET_ITEM_LOCATIONS_LIST,
    payload: data,
  };
};

export const setItemLocation = (data) => {
  return {
    type: SET_ITEM_LOCATION,
    payload: data,
  };
};

export const addItemLocation = () => {
  return {
    type: ADD_ITEM_LOCATION,
    payload: {},
  };
};

export const emptyItemLocation = () => {
  return {
    type: EMPTY_ITEM_LOCATION,
    payload: {},
  };
};

export const deleteItemLocation = (id) => {
  return {
    type: DELETE_ITEM_LOCATION,
    payload: { id },
  };
};

export const editItemLocation = (id) => {
  return {
    type: EDIT_ITEM_LOCATION,
    payload: { id },
  };
};

export const updateItemLocation = (id) => {
  return {
    type: UPDATE_ITEM_LOCATION,
    payload: { id },
  };
};

export const setItemLocationFilter = (data) => {
  return {
    type: SET_ITEM_LOCATION_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
