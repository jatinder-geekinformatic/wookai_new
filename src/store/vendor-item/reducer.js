import {
  GET_VENDOR_ITEMS,
  SET_VENDOR_ITEMS,
  API_ERROR,
  SET_VENDOR_ITEM,
  EMPTY_VENDOR_ITEM,
  SET_VENDOR_ITEM_FILTER,
} from './actionTypes';

const initialState = {
  vendorItems: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  vendorItem: {
    item: '',
    each_available: '',
    pack: '',
    size: '',
    brand: '',
    description: '',
    price: '',
    supprebate: '',
    supp_reb_type: '',
    contract_price: '',
    manufacturing_rebate: '',
    manufacturing_rebate_type: '',
    rebate_exp_date: '',
    lead_time_item: 0,
    discount_check: 0,
    item_price_type: '',
    contract_price_type: ''
  },
  error: '',
  loading: false,
};

const vendorItem = (state = initialState, action) => {
  switch (action.type) {
    case GET_VENDOR_ITEMS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_VENDOR_ITEMS:
      state = {
        ...state,
        vendorItems: action.payload,
        loading: false,
      };
      break;
    case SET_VENDOR_ITEM:
      state = {
        ...state,
        vendorItem: {
          ...state.vendorItem,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_VENDOR_ITEM:
      state = {
        ...state,
        vendorItem: {
          ...state.vendorItem,
          item: '',
          each_available: '',
          pack: '',
          size: '',
          brand: '',
          description: '',
          price: '',
          supprebate: '',
          supp_reb_type: '',
          contract_price: '',
          manufacturing_rebate: '',
          manufacturing_rebate_type: '',
          rebate_exp_date: '',
          lead_time_item: 0,
          discount_check: 0,
          item_price_type: '',
          contract_price_type: ''
        },
      };
      break;
    case SET_VENDOR_ITEM_FILTER:
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

export default vendorItem;
