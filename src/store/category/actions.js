import {
  GET_CATEGORIES,
  SET_CATEGORIES,
  GET_CATEGORIES_LIST,
  SET_CATEGORIES_LIST,
  SET_CATEGORY,
  ADD_CATEGORY,
  EMPTY_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  UPDATE_CATEGORY,
  SET_CATEGORY_FILTER,
  API_ERROR,
} from './actionTypes';

export const getCategories = () => {
  return {
    type: GET_CATEGORIES,
    payload: {},
  };
};

export const setCategories = (data) => {
  return {
    type: SET_CATEGORIES,
    payload: data,
  };
};

export const getCategoriesList = () => {
  return {
    type: GET_CATEGORIES_LIST,
    payload: {},
  };
};

export const setCategoriesList = (data) => {
  return {
    type: SET_CATEGORIES_LIST,
    payload: data,
  };
};

export const setCategory = (data) => {
  return {
    type: SET_CATEGORY,
    payload: data,
  };
};

export const addCategory = () => {
  return {
    type: ADD_CATEGORY,
    payload: {},
  };
};

export const emptyCategory = () => {
  return {
    type: EMPTY_CATEGORY,
    payload: {},
  };
};

export const deleteCategory = (id) => {
  return {
    type: DELETE_CATEGORY,
    payload: { id },
  };
};

export const editCategory = (id) => {
  return {
    type: EDIT_CATEGORY,
    payload: { id },
  };
};

export const updateCategory = (id) => {
  return {
    type: UPDATE_CATEGORY,
    payload: { id },
  };
};

export const setCategoryFilter = (data) => {
  return {
    type: SET_CATEGORY_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
