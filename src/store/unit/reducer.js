import {
  GET_UNITS,
  SET_UNITS,
  API_ERROR,
  SET_UNIT,
  SET_UNIT_FILTER,
  EMPTY_UNIT,
  SET_UNITS_LIST,
} from './actionTypes';

const initialState = {
  unitsList: [],
  units: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  unit: {
    unit_name: '',
    unit_abbreviation: '',
  },
  error: '',
  loading: false,
};

const unit = (state = initialState, action) => {
  switch (action.type) {
    case GET_UNITS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_UNITS:
      state = {
        ...state,
        units: action.payload,
        loading: false,
      };
      break;
    case SET_UNIT:
      state = {
        ...state,
        unit: {
          ...state.unit,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_UNIT:
      state = {
        ...state,
        unit: {
          ...state.unit,
          unit_name: '',
          unit_abbreviation: '',
        },
      };
      break;
      case SET_UNIT_FILTER:
        state = {
          ...state,
          filter: {
            ...state.filter,
            [action.payload.field]: action.payload.value,
          },
        };
        break;
      case SET_UNITS_LIST:
        state = {
          ...state,
          unitsList: action.payload
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

export default unit;
