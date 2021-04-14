import {
  GET_IGNORE_COMMENTS,
  SET_IGNORE_COMMENTS,
  SET_IGNORE_COMMENT,
  ADD_IGNORE_COMMENT,
  EMPTY_IGNORE_COMMENT,
  DELETE_IGNORE_COMMENT,
  EDIT_IGNORE_COMMENT,
  UPDATE_IGNORE_COMMENT,
  SET_IGNORE_COMMENT_FILTER,
  GET_IGNORE_COMMENTS_LIST,
  SET_IGNORE_COMMENTS_LIST,
  API_ERROR
} from './actionTypes';

export const getIgnoreComments = () => {
  return {
    type: GET_IGNORE_COMMENTS,
    payload: {},
  };
};

export const setIgnoreComments = (data) => {
  return {
    type: SET_IGNORE_COMMENTS,
    payload: data,
  };
};

export const getIgnoreCommentsList = () => {
  return {
    type: GET_IGNORE_COMMENTS_LIST,
    payload: {},
  };
};

export const setIgnoreCommentsList = (data) => {
  return {
    type: SET_IGNORE_COMMENTS_LIST,
    payload: data,
  };
};

export const setIgnoreComment = (data) => {
  return {
    type: SET_IGNORE_COMMENT,
    payload: data,
  };
};

export const addIgnoreComment = () => {
  return {
    type: ADD_IGNORE_COMMENT,
    payload: {},
  };
};

export const emptyIgnoreComment = () => {
  return {
    type: EMPTY_IGNORE_COMMENT,
    payload: {},
  };
};

export const deleteIgnoreComment = (id) => {
  return {
    type: DELETE_IGNORE_COMMENT,
    payload: { id },
  };
};

export const editIgnoreComment = (id) => {
  return {
    type: EDIT_IGNORE_COMMENT,
    payload: { id },
  };
};

export const updateIgnoreComment = (id) => {
  return {
    type: UPDATE_IGNORE_COMMENT,
    payload: { id },
  };
};

export const setIgnoreCommentFilter = (data) => {
  return {
    type: SET_IGNORE_COMMENT_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
