import {
  API_ERROR,
  SET_ACCOUNT,
  EMPTY_ACCOUNT,
} from './actionTypes';

const initialState = {
  account: {
    email: '',
    password: '',
    full_name: '',
    address: '',
    city: '',
    fk_state_id: '',
    state: '',
    zip_code: '',
    fk_country_id: '',
    fk_timezone_id: '',
    cell: '',
  },
  error: '',
  loading: false,
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      state = {
        ...state,
        account: {
          ...state.account,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_ACCOUNT:
      state = {
        ...state,
        account: {
          ...state.account,
          email: '',
          password: '',
          full_name: '',
          address: '',
          city: '',
          fk_state_id: '',
          state: '',
          zip_code: '',
          fk_country_id: '',
          fk_timezone_id: '',
          cell: ''
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

export default account;
