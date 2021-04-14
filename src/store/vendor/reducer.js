import {
  GET_VENDORS,
  SET_VENDORS,
  API_ERROR,
  SET_VENDOR,
  EMPTY_VENDOR,
  SET_VENDOR_FILTER,
  SET_VENDORS_LIST,
} from './actionTypes';

const initialState = {
  vendorsList: [],
  vendors: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  vendor: {
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

const vendor = (state = initialState, action) => {
  switch (action.type) {
    case GET_VENDORS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_VENDORS:
      state = {
        ...state,
        vendors: action.payload,
        loading: false,
      };
      break;
    case SET_VENDOR:
      state = {
        ...state,
        vendor: {
          ...state.vendor,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_VENDOR:
      state = {
        ...state,
        vendor: {
          ...state.vendor,
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
    case SET_VENDOR_FILTER:
      state = {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.field]: action.payload.value
        }
      };
      break;
    case SET_VENDORS_LIST:
      state = {
        ...state,
        vendorsList: action.payload
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

export default vendor;
