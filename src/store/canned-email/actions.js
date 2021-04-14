import {
  GET_CANNED_EMAILS,
  SET_CANNED_EMAILS,
  SET_CANNED_EMAIL,
  ADD_CANNED_EMAIL,
  EMPTY_CANNED_EMAIL,
  DELETE_CANNED_EMAIL,
  EDIT_CANNED_EMAIL,
  UPDATE_CANNED_EMAIL,
  SET_CANNED_EMAIL_FILTER,
  API_ERROR,
} from './actionTypes';
export const getCannedEmails = () => {
  return {
    type: GET_CANNED_EMAILS,
    payload: {},
  };
};

export const setCannedEmails = (data) => {
  return {
    type: SET_CANNED_EMAILS,
    payload: data,
  };
};

export const setCannedEmail = (data) => {
  return {
    type: SET_CANNED_EMAIL,
    payload: data,
  };
};

export const addCannedEmail = () => {
  return {
    type: ADD_CANNED_EMAIL,
    payload: {},
  };
};

export const emptyCannedEmail = () => {
  return {
    type: EMPTY_CANNED_EMAIL,
    payload: {},
  };
};

export const deleteCannedEmail = (id) => {
  return {
    type: DELETE_CANNED_EMAIL,
    payload: { id },
  };
};

export const editCannedEmail = (id) => {
  return {
    type: EDIT_CANNED_EMAIL,
    payload: { id },
  };
};

export const updateCannedEmail = (id) => {
  return {
    type: UPDATE_CANNED_EMAIL,
    payload: { id },
  };
};

export const setCannedEmailFilter = (data) => {
  return {
    type: SET_CANNED_EMAIL_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
