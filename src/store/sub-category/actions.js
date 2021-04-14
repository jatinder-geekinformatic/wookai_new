import {
  GET_SUB_CATEGORIES,
  SET_SUB_CATEGORIES,
  SET_SUB_CATEGORY,
  ADD_SUB_CATEGORY,
  EMPTY_SUB_CATEGORY,
  DELETE_SUB_CATEGORY,
  EDIT_SUB_CATEGORY,
  UPDATE_SUB_CATEGORY,
  SET_SUB_CATEGORY_FILTER,
  API_ERROR,
} from './actionTypes';
export const getSubCategories = () => {
  return {
    type: GET_SUB_CATEGORIES,
    payload: {},
  };
};

export const setSubCategories = (data) => {
  return {
    type: SET_SUB_CATEGORIES,
    payload: data,
  };
};

export const setSubCategory = (data) => {
  return {
    type: SET_SUB_CATEGORY,
    payload: data,
  };
};

export const addSubCategory = () => {
  return {
    type: ADD_SUB_CATEGORY,
    payload: {},
  };
};

export const emptySubCategory = () => {
  return {
    type: EMPTY_SUB_CATEGORY,
    payload: {},
  };
};

export const deleteSubCategory = (id) => {
  return {
    type: DELETE_SUB_CATEGORY,
    payload: { id },
  };
};

export const editSubCategory = (id) => {
  return {
    type: EDIT_SUB_CATEGORY,
    payload: { id },
  };
};

export const updateSubCategory = (id) => {
  return {
    type: UPDATE_SUB_CATEGORY,
    payload: { id },
  };
};

export const setSubCategoryFilter = (data) => {
  return {
    type: SET_SUB_CATEGORY_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
