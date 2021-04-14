import { GET_USERS, SET_USERS, SET_USER, ADD_USER, EMPTY_USER, DELETE_USER, EDIT_USER, UPDATE_USER, SET_USER_FILTER, API_ERROR } from './actionTypes';
export const getUsers = () => {
  return {
    type: GET_USERS,
    payload: { },
  };
};

export const setUsers = (data) => {
  return {
    type: SET_USERS,
    payload: data,
  };
};

export const setUser = (data) => {
  return {
    type: SET_USER,
    payload: data,
  };
};

export const addUser = (history) => {
  return {
    type: ADD_USER,
    payload: {history},
  };
};

export const emptyUser = () => {
  return {
    type: EMPTY_USER,
    payload: {},
  };
};

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    payload: {id},
  };
};

export const editUser = (id) => {
  return {
    type: EDIT_USER,
    payload: {id}
  }
}

export const updateUser = (history, id) => {
  return {
    type: UPDATE_USER,
    payload: {history, id}
  }
}

export const setUserFilter = (data) => {
  return {
    type: SET_USER_FILTER,
    payload: data
  }
}

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
