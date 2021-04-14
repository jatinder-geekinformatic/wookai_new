import {
  GET_COUNTRIES,
  SET_COUNTRIES,
  API_ERROR
} from './actionTypes';

const initialState = {
  countries: [],
  error: '',
  loading: false,
};

const country = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_COUNTRIES:
      state = {
        ...state,
        countries: action.payload,
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

export default country;
