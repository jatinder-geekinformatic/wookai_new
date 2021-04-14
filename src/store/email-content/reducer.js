import {
  GET_EMAIL_CONTENTS,
  SET_EMAIL_CONTENTS,
  API_ERROR,
  SET_EMAIL_CONTENT,
  EMPTY_EMAIL_CONTENT,
  SET_EMAIL_CONTENT_FILTER,
} from './actionTypes';

const initialState = {
  emailContents: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  emailContent: {
    email_name: '',
    from_name: '',
    content: '',
    from_email: '',
    subject: '',
  },
  error: '',
  loading: false,
};

const emailContent = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMAIL_CONTENTS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_EMAIL_CONTENTS:
      state = {
        ...state,
        emailContents: action.payload,
        loading: false,
      };
      break;
    case SET_EMAIL_CONTENT:
      state = {
        ...state,
        emailContent: {
          ...state.emailContent,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_EMAIL_CONTENT:
      state = {
        ...state,
        emailContent: {
          ...state.emailContent,
          email_name: '',
          from_name: '',
          content: '',
          from_email: '',
          subject: '',
        },
      };
      break;
    case SET_EMAIL_CONTENT_FILTER:
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

export default emailContent;
