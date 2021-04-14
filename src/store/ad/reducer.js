import { API_ERROR, SET_AD } from './actionTypes';

const initialState = {
  ad: {
    bottom: '',
    right_side_1: '',
    right_side_2: '',
    google_analytics: ''
  },
  error: '',
  loading: false,
};

const ad = (state = initialState, action) => {
  switch (action.type) {
    case SET_AD:
      state = {
        ...state,
        ad: {
          ...state.ad,
          [action.payload.field]: action.payload.value,
        },
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

export default ad;
