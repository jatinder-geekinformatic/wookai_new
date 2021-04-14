import {
  GET_DEFAULT_PROFILES,
  SET_DEFAULT_PROFILES,
  GET_DEFAULT_PROFILES_LIST,
  SET_DEFAULT_PROFILES_LIST,
  API_ERROR,
  SET_DEFAULT_PROFILE,
  EMPTY_DEFAULT_PROFILE,
  SET_DEFAULT_PROFILE_FILTER,
} from "./actionTypes";

const initialState = {
  defaultProfiles: [],
  defaultProfilesList: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: "",
  },
  defaultProfile: {
    email_name: "",
    from_name: "",
    content: "",
    from_email: "",
    subject: "",
  },
  error: "",
  loading: false,
};

const defaultProfile = (state = initialState, action) => {
  switch (action.type) {
    case GET_DEFAULT_PROFILES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_DEFAULT_PROFILES:
      state = {
        ...state,
        defaultProfiles: action.payload,
        loading: false,
      };
      break;
    case SET_DEFAULT_PROFILE:
      state = {
        ...state,
        defaultProfile: {
          ...state.defaultProfile,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_DEFAULT_PROFILE:
      state = {
        ...state,
        defaultProfile: {
          ...state.defaultProfile,
          email_name: "",
          from_name: "",
          content: "",
          from_email: "",
          subject: "",
        },
      };
      break;
    case SET_DEFAULT_PROFILE_FILTER:
      state = {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case GET_DEFAULT_PROFILES_LIST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_DEFAULT_PROFILES_LIST:
      state = {
        ...state,
        defaultProfilesList: action.payload,
        loading: false,
      };
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default defaultProfile;
