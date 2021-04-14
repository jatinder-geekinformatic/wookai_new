import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  EMPTY_REGISTER_USER,
  SET_REGISTER_USER,
} from "./actionTypes";

export const registerUser = (history) => {
  return {
    type: REGISTER_USER,
    payload: { history },
  };
};

export const setRegisterUser = (data) => {
    return {
      type: SET_REGISTER_USER,
      payload: data,
    };
  }

export const emptyRegisterUser = () => {
  return {
    type: EMPTY_REGISTER_USER,
    payload: {},
  };
};

export const registerUserSuccessful = (user) => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  };
};

export const registerUserFailed = (user) => {
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  };
};
