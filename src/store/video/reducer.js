import {
  GET_VIDEOS,
  SET_VIDEOS,
  API_ERROR,
  SET_VIDEO,
  EMPTY_VIDEO,
  SET_VIDEO_FILTER,
} from './actionTypes';

const initialState = {
  videos: [],
  filter: {
    offSet: 0,
    limit: 10,
    pages: 0,
    currentPage: 1,
    query: '',
  },
  video: {
    video_url: '',
    desc: '',
  },
  error: '',
  loading: false,
};

const video = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SET_VIDEOS:
      state = {
        ...state,
        videos: action.payload,
        loading: false,
      };
      break;
    case SET_VIDEO:
      state = {
        ...state,
        video: {
          ...state.video,
          [action.payload.field]: action.payload.value,
        },
      };
      break;
    case EMPTY_VIDEO:
      state = {
        ...state,
        video: {
          ...state.video,
          video_url: '',
          desc: '',
        },
      };
      break;
    case SET_VIDEO_FILTER:
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

export default video;
