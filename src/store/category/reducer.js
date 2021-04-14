import {
  GET_CATEGORIES,
  SET_CATEGORIES,
  API_ERROR,
  SET_CATEGORY,
  SET_CATEGORY_FILTER,
  EMPTY_CATEGORY,
  SET_CATEGORIES_LIST,
} from "./actionTypes";

const initialState = {
  categoriesList: [],
  categories: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: "",
  },
  category: {
    category_name: "",
  },
  error: "",
  loading: false,
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_CATEGORIES:
      state = {
        ...state,
        categories: action.payload,
        loading: false,
      };
      break;
    case SET_CATEGORY:
      state = {
        ...state,
        category: {
          ...state.category,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_CATEGORY:
      state = {
        ...state,
        category: {
          ...state.category,
          category_name: "",
        },
      };
      break;
    case SET_CATEGORY_FILTER:
      state = {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case SET_CATEGORIES_LIST:
      state = {
        ...state,
        categoriesList: action.payload,
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

export default category;
