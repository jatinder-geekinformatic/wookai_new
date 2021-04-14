import {
  GET_CANNED_EMAILS,
  SET_CANNED_EMAILS,
  API_ERROR,
  SET_CANNED_EMAIL,
  EMPTY_CANNED_EMAIL,
  SET_CANNED_EMAIL_FILTER,
} from './actionTypes';

const initialState = {
  cannedEmails: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  cannedEmail: {
    email_name: '',
    from_name: '',
    content: '',
    from_email: '',
    subject: '',
  },
  error: '',
  loading: false,
};

const cannedEmail = (state = initialState, action) => {
  switch (action.type) {
    case GET_CANNED_EMAILS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_CANNED_EMAILS:
      state = {
        ...state,
        cannedEmails: action.payload,
        loading: false,
      };
      break;
    case SET_CANNED_EMAIL:
      state = {
        ...state,
        cannedEmail: {
          ...state.cannedEmail,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_CANNED_EMAIL:
      state = {
        ...state,
        cannedEmail: {
          ...state.cannedEmail,
          email_name: '',
          from_name: '',
          content: '',
          from_email: '',
          subject: '',
        },
      };
      break;
    case SET_CANNED_EMAIL_FILTER:
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

export default cannedEmail;
