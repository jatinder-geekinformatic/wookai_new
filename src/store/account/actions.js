import {
  SET_ACCOUNT,
  EMPTY_ACCOUNT,
  EDIT_ACCOUNT,
  UPDATE_ACCOUNT,
  API_ERROR,
} from "./actionTypes";


export const setAccount = (data) => {
  return {
    type: SET_ACCOUNT,
    payload: data,
  };
};

export const emptyAccount = () => {
  return {
    type: EMPTY_ACCOUNT,
    payload: {},
  };
};

export const editAccount = () => {
  return {
    type: EDIT_ACCOUNT,
    payload: {},
  };
};

export const updateAccount = (history) => {
  return {
    type: UPDATE_ACCOUNT,
    payload: { history },
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
