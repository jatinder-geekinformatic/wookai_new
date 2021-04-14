import {
  GET_WOOKAI_VENDORS,
  SET_WOOKAI_VENDORS,
  API_ERROR,
  SET_WOOKAI_VENDOR,
  EMPTY_WOOKAI_VENDOR,
  SET_WOOKAI_VENDOR_FILTER,
} from './actionTypes';

const initialState = {
  wookaiVendors: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  wookaiVendor: {
    food_format: '',
    vendor_email: '',
    vendor_name: '',
    customer_department: '',
    vendor_phone: '',
    supplier_username: '',
    supplier_password: '',
    distributor: '',
    ordering_url: '',
    transportation_cost: '',
    minimum_order_amount: '',
    vendor_rebate_type: '',
    rebate_price: '',
    miscellaneous_cost: '',
    enable_deliver_date: ''
  },
  error: '',
  loading: false,
};

const wookaiVendor = (state = initialState, action) => {
  switch (action.type) {
    case GET_WOOKAI_VENDORS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_WOOKAI_VENDORS:
      state = {
        ...state,
        wookaiVendors: action.payload,
        loading: false,
      };
      break;
    case SET_WOOKAI_VENDOR:
      state = {
        ...state,
        wookaiVendor: {
          ...state.wookaiVendor,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_WOOKAI_VENDOR:
      state = {
        ...state,
        wookaiVendor: {
          ...state.wookaiVendor,
          food_format: '',
          vendor_email: '',
          vendor_name: '',
          customer_department: '',
          vendor_phone: '',
          supplier_username: '',
          supplier_password: '',
          distributor: '',
          ordering_url: '',
          transportation_cost: '',
          minimum_order_amount: '',
          vendor_rebate_type: '',
          rebate_price: '',
          miscellaneous_cost: '',
          enable_deliver_date: ''
        },
      };
      break;
    case SET_WOOKAI_VENDOR_FILTER:
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

export default wookaiVendor;
