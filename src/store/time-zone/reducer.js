import {
  GET_TIME_ZONES,
  SET_TIME_ZONES,
  API_ERROR
} from './actionTypes';

const initialState = {
  timeZones: [],
  error: '',
  loading: false,
};

const timeZone = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIME_ZONES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_TIME_ZONES:
      state = {
        ...state,
        timeZones: action.payload,
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

export default timeZone;
