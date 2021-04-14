import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  EMPTY_REGISTER_USER,
  SET_REGISTER_USER
} from "./actionTypes";

const initialState = {
  register: {
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
    user_type: '',
    fk_profile_id: '',
    cell: ''
  },  
  registrationError: null,
  message: null,
  loading: false,
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        user: null,
        loading: true,
        registrationError: null,
      };
      break;
      case SET_REGISTER_USER:
        state = {
          ...state,
          register: {
            ...state.register,
            [action.payload.field]: action.payload.value,
          },
        };
        break;
    case EMPTY_REGISTER_USER:
      state = {
        ...state,
       register: {
         ...state.register,
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
         user_type: '',
         fk_profile_id: '',
         cell: '' 
       }
      };
      break;
    case REGISTER_USER_FAILED:
      state = {
        ...state,
        user: null,
        loading: false,
        registrationError: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default account;
