import {
  GET_CLIENTS,
  SET_CLIENTS,
  API_ERROR,
  SET_CLIENT,
  EMPTY_CLIENT,
  SET_CLIENT_FILTER,
} from './actionTypes';

const initialState = {
  clients: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  client: {
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

const client = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_CLIENTS:
      state = {
        ...state,
        clients: action.payload,
        loading: false,
      };
      break;
    case SET_CLIENT:
      state = {
        ...state,
        client: {
          ...state.client,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_CLIENT:
      state = {
        ...state,
        client: {
          ...state.client,
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
    case SET_CLIENT_FILTER:
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

export default client;
