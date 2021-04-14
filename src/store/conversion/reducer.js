import {
  GET_CONVERSIONS,
  SET_CONVERSIONS,
  API_ERROR,
  SET_CONVERSION,
  SET_CONVERSION_FILTER,
  EMPTY_CONVERSION,
} from './actionTypes';

const initialState = {
  conversions: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  conversion: {
    fk_unit_id1: '',
    fk_unit_id2: '',
    value: ''
  },
  error: '',
  loading: false,
};

const conversion = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSIONS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_CONVERSIONS:
      state = {
        ...state,
        conversions: action.payload,
        loading: false,
      };
      break;
    case SET_CONVERSION:
      state = {
        ...state,
        conversion: {
          ...state.conversion,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_CONVERSION:
      state = {
        ...state,
        conversion: {
          ...state.conversion,
          fk_unit_id1: '',
          fk_unit_id2: '',
          value: ''
        },
      };
      break;
      case SET_CONVERSION_FILTER:
        state = {
          ...state,
          filter: {
            ...state.filter,
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

export default conversion;
