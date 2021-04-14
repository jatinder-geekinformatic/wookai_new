import {
  GET_SUB_CATEGORIES,
  SET_SUB_CATEGORIES,
  API_ERROR,
  SET_SUB_CATEGORY,
  SET_SUB_CATEGORY_FILTER,
  EMPTY_SUB_CATEGORY,
} from './actionTypes';

const initialState = {
  subCategories: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  subCategory: {
    parent_id: '',
    category_name: '',
  },
  error: '',
  loading: false,
};

const subCategory = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUB_CATEGORIES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_SUB_CATEGORIES:
      state = {
        ...state,
        subCategories: action.payload,
        loading: false,
      };
      break;
    case SET_SUB_CATEGORY:
      state = {
        ...state,
        subCategory: {
          ...state.subCategory,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_SUB_CATEGORY:
      state = {
        ...state,
        subCategory: {
          ...state.subCategory,
          location_name: ''
        },
      };
      break;
      case SET_SUB_CATEGORY_FILTER:
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

export default subCategory;
