import {
  GET_BUSINESS_LOCATIONS,
  SET_BUSINESS_LOCATIONS,
  API_ERROR,
  SET_BUSINESS_LOCATION,
  EMPTY_BUSINESS_LOCATION,
  SET_BUSINESS_LOCATION_FILTER,
} from './actionTypes';

const initialState = {
  businessLocations: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  businessLocation: {
    business_name: '',
    business_address: '',
    business_country_id: '',
    business_state_id: '',
    business_state: '',
    business_city: '',
    business_zip_code: '',
    par_levels_enabled: 1,
    assigned_to: '',
    is_slave: 0
  },
  error: '',
  loading: false,
};

const businessLocation = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESS_LOCATIONS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_BUSINESS_LOCATIONS:
      state = {
        ...state,
        businessLocations: action.payload,
        loading: false,
      };
      break;
    case SET_BUSINESS_LOCATION:
      state = {
        ...state,
        businessLocation: {
          ...state.businessLocation,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_BUSINESS_LOCATION:
      state = {
        ...state,
        businessLocation: {
          ...state.businessLocation,
          business_name: '',
          business_address: '',
          business_country_id: '',
          business_state_id: '',
          business_state: '',
          business_city: '',
          business_zip_code: '',
          par_levels_enabled: 1,
          assigned_to: '',
          is_slave: 0
        },
      };
      break;
    case SET_BUSINESS_LOCATION_FILTER:
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

export default businessLocation;
