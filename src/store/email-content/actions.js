import {
  GET_EMAIL_CONTENTS,
  SET_EMAIL_CONTENTS,
  SET_EMAIL_CONTENT,
  ADD_EMAIL_CONTENT,
  EMPTY_EMAIL_CONTENT,
  DELETE_EMAIL_CONTENT,
  EDIT_EMAIL_CONTENT,
  UPDATE_EMAIL_CONTENT,
  SET_EMAIL_CONTENT_FILTER,
  API_ERROR,
} from './actionTypes';
export const getEmailContents = () => {
  return {
    type: GET_EMAIL_CONTENTS,
    payload: {},
  };
};

export const setEmailContents = (data) => {
  return {
    type: SET_EMAIL_CONTENTS,
    payload: data,
  };
};

export const setEmailContent = (data) => {
  return {
    type: SET_EMAIL_CONTENT,
    payload: data,
  };
};

export const addEmailContent = () => {
  return {
    type: ADD_EMAIL_CONTENT,
    payload: {},
  };
};

export const emptyEmailContent = () => {
  return {
    type: EMPTY_EMAIL_CONTENT,
    payload: {},
  };
};

export const deleteEmailContent = (id) => {
  return {
    type: DELETE_EMAIL_CONTENT,
    payload: { id },
  };
};

export const editEmailContent = (id) => {
  return {
    type: EDIT_EMAIL_CONTENT,
    payload: { id },
  };
};

export const updateEmailContent = (id) => {
  return {
    type: UPDATE_EMAIL_CONTENT,
    payload: { id },
  };
};

export const setEmailContentFilter = (data) => {
  return {
    type: SET_EMAIL_CONTENT_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
