import {
  GET_USERS,
  SET_USERS,
  API_ERROR,
  SET_USER,
  EMPTY_USER,
  SET_USER_FILTER,
} from './actionTypes';

const initialState = {
  users: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  user: {
    email: '',
    password: '',
    full_name: '',
    user_type: '',
    fk_profile_id: ''
  },
  error: '',
  loading: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_USERS:
      state = {
        ...state,
        users: action.payload,
        loading: false,
      };
      break;
    case SET_USER:
      state = {
        ...state,
        user: {
          ...state.user,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_USER:
      state = {
        ...state,
        user: {
          ...state.user,
          email: '',
          password: '',
          full_name: '',
          user_type: '',
          fk_profile_id: ''
        },
      };
      break;
    case SET_USER_FILTER:
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

export default user;
