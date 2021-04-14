import {
  GET_CMS,
  SET_CMS,
  API_ERROR,
  SET_CM,
  EMPTY_CM,
  SET_CMS_FILTER,
} from './actionTypes';

const initialState = {
  cms: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: '',
  },
  cm: {
    heading: '',
    content: '',
    page_slug: '',
    meta_title: '',
    meta_keyword: '',
    meta_description: '',
  },
  error: '',
  loading: false,
};

const cms = (state = initialState, action) => {
  switch (action.type) {
    case GET_CMS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_CMS:
      state = {
        ...state,
        cms: action.payload,
        loading: false,
      };
      break;
    case SET_CM:
      state = {
        ...state,
        cm: {
          ...state.cm,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_CM:
      state = {
        ...state,
        cm: {
          ...state.cm,
          heading: '',
          content: '',
          page_slug: '',
          meta_title: '',
          meta_keyword: '',
          meta_description: '',
        },
      };
      break;
    case SET_CMS_FILTER:
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

export default cms;
