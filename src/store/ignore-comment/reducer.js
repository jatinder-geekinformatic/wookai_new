import {
  GET_IGNORE_COMMENTS,
  SET_IGNORE_COMMENTS,
  API_ERROR,
  SET_IGNORE_COMMENT,
  SET_IGNORE_COMMENT_FILTER,
  EMPTY_IGNORE_COMMENT,
  SET_IGNORE_COMMENTS_LIST
} from './actionTypes';

const initialState = {
  ignoreCommentsList: [],
  ignoreComments: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  ignoreComment: {
    comment: '',
  },
  error: '',
  loading: false,
};

const ignoreComment = (state = initialState, action) => {
  switch (action.type) {
    case GET_IGNORE_COMMENTS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_IGNORE_COMMENTS:
      state = {
        ...state,
        ignoreComments: action.payload,
        loading: false,
      };
      break;
    case SET_IGNORE_COMMENT:
      state = {
        ...state,
        ignoreComment: {
          ...state.ignoreComment,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_IGNORE_COMMENT:
      state = {
        ...state,
        ignoreComment: {
          ...state.ignoreComment,
          comment: ''
        },
      };
      break;
      case SET_IGNORE_COMMENT_FILTER:
        state = {
          ...state,
          filter: {
            ...state.filter,
            [action.payload.field]: action.payload.value,
          },
        };
        break;
      case SET_IGNORE_COMMENTS_LIST:
        state = {
          ...state,
          ignoreCommentsList: action.payload,
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

export default ignoreComment;
