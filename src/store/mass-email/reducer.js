import {
  GET_MASS_EMAILS,
  SET_MASS_EMAILS,
  API_ERROR,
  SET_MASS_EMAIL,
  EMPTY_MASS_EMAIL,
  SET_MASS_EMAIL_FILTER,
} from './actionTypes';

const initialState = {
  massEmails: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  massEmail: {
    email_name: '',
    from_name: '',
    content: '',
    from_email: '',
    subject: '',
    hourly_total: '',
    user_type: ''
  },
  error: '',
  loading: false,
};

const massEmail = (state = initialState, action) => {
  switch (action.type) {
    case GET_MASS_EMAILS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_MASS_EMAILS:
      state = {
        ...state,
        massEmails: action.payload,
        loading: false,
      };
      break;
    case SET_MASS_EMAIL:
      state = {
        ...state,
        massEmail: {
          ...state.massEmail,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_MASS_EMAIL:
      state = {
        ...state,
        massEmail: {
          ...state.massEmail,
          email_name: '',
          from_name: '',
          content: '',
          from_email: '',
          subject: '',
          hourly_total: '',
          user_type: ''
        },
      };
      break;
    case SET_MASS_EMAIL_FILTER:
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

export default massEmail;
