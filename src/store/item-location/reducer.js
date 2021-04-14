import {
  GET_ITEM_LOCATIONS,
  SET_ITEM_LOCATIONS,
  API_ERROR,
  SET_ITEM_LOCATION,
  SET_ITEM_LOCATION_FILTER,
  EMPTY_ITEM_LOCATION,
  SET_ITEM_LOCATIONS_LIST
} from './actionTypes';

const initialState = {
  itemLocationsList: [],
  itemLocations: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  itemLocation: {
    location_name: '',
  },
  error: '',
  loading: false,
};

const itemLocation = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_LOCATIONS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_ITEM_LOCATIONS:
      state = {
        ...state,
        itemLocations: action.payload,
        loading: false,
      };
      break;
    case SET_ITEM_LOCATION:
      state = {
        ...state,
        itemLocation: {
          ...state.itemLocation,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_ITEM_LOCATION:
      state = {
        ...state,
        itemLocation: {
          ...state.itemLocation,
          location_name: ''
        },
      };
      break;
      case SET_ITEM_LOCATION_FILTER:
        state = {
          ...state,
          filter: {
            ...state.filter,
            [action.payload.field]: action.payload.value,
          },
        };
        break;
    case SET_ITEM_LOCATIONS_LIST:
      state = {
        ...state,
        itemLocationsList: action.payload
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

export default itemLocation;
