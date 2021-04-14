import {
  GET_BUSINESS_PROFILES,
  SET_BUSINESS_PROFILES,
  API_ERROR,
  SET_BUSINESS_PROFILE,
  EMPTY_BUSINESS_PROFILE,
  SET_BUSINESS_PROFILE_FILTER,
} from './actionTypes';

const initialState = {
  businessProfiles: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  businessProfile: {
    email_name: '',
    from_name: '',
    content: '',
    from_email: '',
    subject: '',
  },
  error: '',
  loading: false,
};

const businessProfile = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESS_PROFILES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_BUSINESS_PROFILES:
      state = {
        ...state,
        businessProfiles: action.payload,
        loading: false,
      };
      break;
    case SET_BUSINESS_PROFILE:
      state = {
        ...state,
        businessProfile: {
          ...state.businessProfile,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_BUSINESS_PROFILE:
      state = {
        ...state,
        businessProfile: {
          ...state.businessProfile,
          email_name: '',
          from_name: '',
          content: '',
          from_email: '',
          subject: '',
        },
      };
      break;
    case SET_BUSINESS_PROFILE_FILTER:
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

export default businessProfile;
