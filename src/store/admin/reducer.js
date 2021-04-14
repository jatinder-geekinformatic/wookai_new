import {
  GET_ADMINS,
  SET_ADMINS,
  API_ERROR,
  SET_ADMIN,
  EMPTY_ADMIN,
  SET_ADMIN_FILTER,
} from './actionTypes';

const initialState = {
  admins: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  admin: {
    email: '',
    password: '',
    full_name: '',
    business_main_number: '',
    address: '',
    city: '',
    fk_state_id: '',
    state: '',
    zip_code: '',
    fk_country_id: ''
  },
  error: '',
  loading: false,
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_ADMINS:
      state = {
        ...state,
        admins: action.payload,
        loading: false,
      };
      break;
    case SET_ADMIN:
      state = {
        ...state,
        admin: {
          ...state.admin,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_ADMIN:
      state = {
        ...state,
        admin: {
          ...state.admin,
          email: '',
          password: '',
          full_name: '',
          business_main_number: '',
          address: '',
          city: '',
          fk_state_id: '',
          state: '',
          zip_code: '',
          fk_country_id: ''
        },
      };
      break;
    case SET_ADMIN_FILTER:
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

export default admin;
