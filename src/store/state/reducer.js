import {
  GET_STATES,
  SET_STATES,
  API_ERROR
} from './actionTypes';

const initialState = {
  states: [],
  error: '',
  loading: false,
};

const state = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_STATES:
      state = {
        ...state,
        states: action.payload,
        loading: false,
      };
      
      break;
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default state;
