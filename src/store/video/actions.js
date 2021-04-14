import { GET_VIDEOS, SET_VIDEOS, SET_VIDEO, ADD_VIDEO, EMPTY_VIDEO, DELETE_VIDEO, EDIT_VIDEO, UPDATE_VIDEO, SET_VIDEO_FILTER, API_ERROR } from './actionTypes';
export const getVideos = () => {
  return {
    type: GET_VIDEOS,
    payload: { },
  };
};

export const setVideos = (data) => {
  return {
    type: SET_VIDEOS,
    payload: data,
  };
};

export const setVideo = (data) => {
  return {
    type: SET_VIDEO,
    payload: data,
  };
};

export const addVideo = () => {
  return {
    type: ADD_VIDEO,
    payload: {},
  };
};

export const emptyVideo = () => {
  return {
    type: EMPTY_VIDEO,
    payload: {},
  };
};

export const deleteVideo = (id) => {
  return {
    type: DELETE_VIDEO,
    payload: {id},
  };
};

export const editVideo = (id) => {
  return {
    type: EDIT_VIDEO,
    payload: {id}
  }
}

export const updateVideo = (id) => {
  return {
    type: UPDATE_VIDEO,
    payload: {id}
  }
}

export const setVideoFilter = (data) => {
  return {
    type: SET_VIDEO_FILTER,
    payload: data
  }
}

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
