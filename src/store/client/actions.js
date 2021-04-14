import {
  GET_CLIENTS,
  SET_CLIENTS,
  SET_CLIENT,
  ADD_CLIENT,
  EMPTY_CLIENT,
  DELETE_CLIENT,
  EDIT_CLIENT,
  UPDATE_CLIENT,
  SET_CLIENT_FILTER,
  API_ERROR,
} from "./actionTypes";
export const getClients = () => {
  return {
    type: GET_CLIENTS,
    payload: {},
  };
};

export const setClients = (data) => {
  return {
    type: SET_CLIENTS,
    payload: data,
  };
};

export const setClient = (data) => {
  return {
    type: SET_CLIENT,
    payload: data,
  };
};

export const addClient = (history) => {
  return {
    type: ADD_CLIENT,
    payload: { history },
  };
};

export const emptyClient = () => {
  return {
    type: EMPTY_CLIENT,
    payload: {},
  };
};

export const deleteClient = (id) => {
  return {
    type: DELETE_CLIENT,
    payload: { id },
  };
};

export const editClient = (id) => {
  return {
    type: EDIT_CLIENT,
    payload: { id },
  };
};

export const updateClient = (history, id) => {
  return {
    type: UPDATE_CLIENT,
    payload: { id, history },
  };
};

export const setClientFilter = (data) => {
  return {
    type: SET_CLIENT_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
