import { API_ERROR, SET_SETTING } from './actionTypes';

const initialState = {
  setting: {
    contact_form_to_email: '',
    cheddar_getter_email: '',
    cheddar_getter_password: '',
    cheddar_getter_product: '',
    cheddar_getter_host: '',
    cheddar_getter_secret_key: '',
    leaddyno_secret_key: '',
  },
  error: '',
  loading: false,
};

const setting = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTING:
      state = {
        ...state,
        setting: {
          ...state.setting,
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

export default setting;
