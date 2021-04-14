import {
  GET_PRODUCTS,
  SET_PRODUCTS,
  API_ERROR,
  SET_PRODUCT,
  EMPTY_PRODUCT,
  SET_PRODUCT_FILTER,
  ADD_PRODUCT_SORT,
} from './actionTypes';

const initialState = {
  sorts: [
    {
      name: '',
      direction: ''
    }
  ],
  products: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  product: {
    email: '',
    password: '',
    full_name: '',
    business_main_number: '',
    address: '',
    city: '',
    fk_state_id: '',
    state: '',
    zip_code: '',
    fk_country_id: '',
    fk_timezone_id: '',
    website: '',
    user_type: '',
    default_profile_id: '',
  },
  error: '',
  loading: false,
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_PRODUCTS:
      state = {
        ...state,
        products: action.payload,
        loading: false,
      };
      break;
    case SET_PRODUCT:
      state = {
        ...state,
        product: {
          ...state.product,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_PRODUCT:
      state = {
        ...state,
        product: {
          ...state.product,
          email: '',
          password: '',
          full_name: '',
          business_main_number: '',
          address: '',
          city: '',
          fk_state_id: '',
          state: '',
          zip_code: '',
          fk_country_id: '',
          fk_timezone_id: '',
          website: '',
          user_type: '',
          default_profile_id: '',
        },
      };
      break;
    case SET_PRODUCT_FILTER:
      state = {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.field]: action.payload.value
        }
      };
      break;
    case ADD_PRODUCT_SORT:
      state = {
        ...state,
       sorts: action.payload
      }
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

export default product;
