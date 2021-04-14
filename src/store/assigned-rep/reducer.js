import {
  GET_ASSIGNED_REPS,
  SET_ASSIGNED_REPS,
  API_ERROR,
  SET_ASSIGNED_REP,
  EMPTY_ASSIGNED_REP,
  SET_ASSIGNED_REP_FILTER,
} from './actionTypes';

const initialState = {
  assignedReps: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: ''
  },
  assignedRep: {
    email: '',
    fk_profile_id: '',
    cell: '',
    fk_vendor_id: '',
    rep_portal: false
  },
  error: '',
  loading: false,
};

const assignedRep = (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSIGNED_REPS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_ASSIGNED_REPS:
      state = {
        ...state,
        assignedReps: action.payload,
        loading: false,
      };
      break;
    case SET_ASSIGNED_REP:
      state = {
        ...state,
        assignedRep: {
          ...state.assignedRep,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_ASSIGNED_REP:
      state = {
        ...state,
        assignedRep: {
          ...state.assignedRep,
          email: '',
          fk_profile_id: '',
          cell: '',
          fk_vendor_id: '',
          rep_portal: false
        },
      };
      break;
    case SET_ASSIGNED_REP_FILTER:
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

export default assignedRep;
