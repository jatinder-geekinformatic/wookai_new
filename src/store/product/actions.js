import {
  GET_PRODUCTS,
  SET_PRODUCTS,
  SET_PRODUCT,
  ADD_PRODUCT,
  EMPTY_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT_FILTER,
  API_ERROR,
  ADD_PRODUCT_SORT,
} from './actionTypes';
export const getProducts = () => {
  return {
    type: GET_PRODUCTS,
    payload: {},
  };
};

export const setProducts = (data) => {
  return {
    type: SET_PRODUCTS,
    payload: data,
  };
};

export const setProduct = (data) => {
  return {
    type: SET_PRODUCT,
    payload: data,
  };
};

export const addProduct = () => {
  return {
    type: ADD_PRODUCT,
    payload: {},
  };
};

export const emptyProduct = () => {
  return {
    type: EMPTY_PRODUCT,
    payload: {},
  };
};

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    payload: { id },
  };
};

export const editProduct = (id) => {
  return {
    type: EDIT_PRODUCT,
    payload: { id },
  };
};

export const updateProduct = (id) => {
  return {
    type: UPDATE_PRODUCT,
    payload: { id },
  };
};

export const setProductFilter = (data) => {
  return {
    type: SET_PRODUCT_FILTER,
    payload: data,
  };
};


export const addProductSort = (data) => {
  return {
    type: ADD_PRODUCT_SORT,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};