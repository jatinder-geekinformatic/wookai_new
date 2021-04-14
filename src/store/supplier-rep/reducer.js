import {
  GET_SUPPLIER_REPS,
  SET_SUPPLIER_REPS,
  API_ERROR,
  SET_SUPPLIER_REP,
  EMPTY_SUPPLIER_REP,
  SET_SUPPLIER_REP_FILTER,
} from './actionTypes';

const initialState = {
  supplierReps: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  supplierRep: {
    email: '',
    password: '',
    full_name: '',
    address: '',
    city: '',
    fk_state_id: '',
    state: '',
    zip_code: '',
    fk_country_id: '',
    fk_timezone_id: '',
    user_type: '',
    fk_profile_id: '',
    cell: '',
  },
  error: '',
  loading: false,
};

const supplierRep = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPPLIER_REPS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_SUPPLIER_REPS:
      state = {
        ...state,
        supplierReps: action.payload,
        loading: false,
      };
      break;
    case SET_SUPPLIER_REP:
      state = {
        ...state,
        supplierRep: {
          ...state.supplierRep,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_SUPPLIER_REP:
      state = {
        ...state,
        supplierRep: {
          ...state.supplierRep,
          email: '',
          password: '',
          full_name: '',
          address: '',
          city: '',
          fk_state_id: '',
          state: '',
          zip_code: '',
          fk_country_id: '',
          fk_timezone_id: '',
          user_type: '',
          fk_profile_id: '',
          cell: ''
        },
      };
      break;
    case SET_SUPPLIER_REP_FILTER:
      state = {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.field]: action.payload.value
        }
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

export default supplierRep;
