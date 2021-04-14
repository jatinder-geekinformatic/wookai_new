import {
  SET_SETTING,
  EDIT_SETTING,
  UPDATE_SETTING,
  API_ERROR,
} from './actionTypes';

export const setSetting = (data) => {
  return {
    type: SET_SETTING,
    payload: data,
  };
};

export const editSetting = (id) => {
  return {
    type: EDIT_SETTING,
    payload: { id },
  };
};

export const updateSetting = (id) => {
  return {
    type: UPDATE_SETTING,
    payload: { id },
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
