import {
  GET_ADMINS,
  SET_ADMINS,
  SET_ADMIN,
  ADD_ADMIN,
  EMPTY_ADMIN,
  DELETE_ADMIN,
  EDIT_ADMIN,
  UPDATE_ADMIN,
  SET_ADMIN_FILTER,
  API_ERROR,
} from './actionTypes';
export const getAdmins = () => {
  return {
    type: GET_ADMINS,
    payload: {},
  };
};

export const setAdmins = (data) => {
  return {
    type: SET_ADMINS,
    payload: data,
  };
};

export const setAdmin = (data) => {
  return {
    type: SET_ADMIN,
    payload: data,
  };
};

export const addAdmin = (history) => {
  return {
    type: ADD_ADMIN,
    payload: {history},
  };
};

export const emptyAdmin = () => {
  return {
    type: EMPTY_ADMIN,
    payload: {},
  };
};

export const deleteAdmin = (id) => {
  return {
    type: DELETE_ADMIN,
    payload: { id },
  };
};

export const editAdmin = (id) => {
  return {
    type: EDIT_ADMIN,
    payload: { id },
  };
};

export const updateAdmin = (history, id) => {
  return {
    type: UPDATE_ADMIN,
    payload: { history, id },
  };
};

export const setAdminFilter = (data) => {
  return {
    type: SET_ADMIN_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
