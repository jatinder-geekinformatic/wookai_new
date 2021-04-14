import { GET_MASS_EMAILS, SET_MASS_EMAILS, SET_MASS_EMAIL, ADD_MASS_EMAIL, EMPTY_MASS_EMAIL, DELETE_MASS_EMAIL, EDIT_MASS_EMAIL, UPDATE_MASS_EMAIL, SET_MASS_EMAIL_FILTER, API_ERROR } from './actionTypes';
export const getMassEmails = () => {
  return {
    type: GET_MASS_EMAILS,
    payload: { },
  };
};

export const setMassEmails = (data) => {
  return {
    type: SET_MASS_EMAILS,
    payload: data,
  };
};

export const setMassEmail = (data) => {
  return {
    type: SET_MASS_EMAIL,
    payload: data,
  };
};

export const addMassEmail = () => {
  return {
    type: ADD_MASS_EMAIL,
    payload: {},
  };
};

export const emptyMassEmail = () => {
  return {
    type: EMPTY_MASS_EMAIL,
    payload: {},
  };
};

export const deleteMassEmail = (id) => {
  return {
    type: DELETE_MASS_EMAIL,
    payload: {id},
  };
};

export const editMassEmail = (id) => {
  return {
    type: EDIT_MASS_EMAIL,
    payload: {id}
  }
}

export const updateMassEmail = (id) => {
  return {
    type: UPDATE_MASS_EMAIL,
    payload: {id}
  }
}

export const setMassEmailFilter = (data) => {
  return {
    type: SET_MASS_EMAIL_FILTER,
    payload: data
  }
}

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
