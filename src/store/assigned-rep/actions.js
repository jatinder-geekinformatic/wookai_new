import {
  GET_ASSIGNED_REPS,
  SET_ASSIGNED_REPS,
  SET_ASSIGNED_REP,
  ADD_ASSIGNED_REP,
  EMPTY_ASSIGNED_REP,
  DELETE_ASSIGNED_REP,
  EDIT_ASSIGNED_REP,
  UPDATE_ASSIGNED_REP,
  SET_ASSIGNED_REP_FILTER,
  API_ERROR,
} from "./actionTypes";
export const getAssignedReps = () => {
  return {
    type: GET_ASSIGNED_REPS,
    payload: {},
  };
};

export const setAssignedReps = (data) => {
  return {
    type: SET_ASSIGNED_REPS,
    payload: data,
  };
};

export const setAssignedRep = (data) => {
  return {
    type: SET_ASSIGNED_REP,
    payload: data,
  };
};

export const addAssignedRep = (history) => {
  return {
    type: ADD_ASSIGNED_REP,
    payload: { history },
  };
};

export const emptyAssignedRep = () => {
  return {
    type: EMPTY_ASSIGNED_REP,
    payload: {},
  };
};

export const deleteAssignedRep = (id) => {
  return {
    type: DELETE_ASSIGNED_REP,
    payload: { id },
  };
};

export const editAssignedRep = (id) => {
  return {
    type: EDIT_ASSIGNED_REP,
    payload: { id },
  };
};

export const updateAssignedRep = (history, id) => {
  return {
    type: UPDATE_ASSIGNED_REP,
    payload: { history,id },
  };
};

export const setAssignedRepFilter = (data) => {
  return {
    type: SET_ASSIGNED_REP_FILTER,
    payload: data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
