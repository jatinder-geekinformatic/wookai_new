import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_VIDEOS,
  ADD_VIDEO,
  DELETE_VIDEO,
  EDIT_VIDEO,
  UPDATE_VIDEO,
} from './actionTypes';
import {
  setVideos,
  emptyVideo,
  setVideo,
  apiError,
  getVideos as fetchVideos,
  setVideoFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { VIDEOS_ENDPOINT } from '../../config/endPoints';

function* getVideos() {
  try {
    const videoState = yield select(getVideo);
    let URL = VIDEOS_ENDPOINT;
    URL += `?offSet=${videoState.filter.offSet}`;
    URL += `&limit=${videoState.filter.limit}`;
    URL += `&query=${videoState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setVideos(res.data.records));

    yield put(
      setVideoFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addVideo() {
  try {
    const video = yield select(getVideo);
    const res = yield httpPost(VIDEOS_ENDPOINT, video);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyVideo());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteVideo({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${VIDEOS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchVideos());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editVideo({ payload: { id } }) {
  try {
    const res = yield httpGet(`${VIDEOS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setVideo({ field: 'video_url', value: res.data.video_url }));
    yield put(setVideo({ field: 'desc', value: res.data.desc }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateVideo({ payload: { id } }) {
  try {
    const unit = yield select(getVideo);
    const res = yield httpPut(`${VIDEOS_ENDPOINT}/${id}`, unit);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getVideo = (state) => state.Video;

export function* watchGetVideos() {
  yield takeEvery(GET_VIDEOS, getVideos);
}

export function* watchAddVideo() {
  yield takeEvery(ADD_VIDEO, addVideo);
}

export function* watchDeleteVideo() {
  yield takeEvery(DELETE_VIDEO, deleteVideo);
}

export function* watchEditVideo() {
  yield takeEvery(EDIT_VIDEO, editVideo);
}

export function* watchUpdateVideo() {
  yield takeEvery(UPDATE_VIDEO, updateVideo);
}

function* videoSaga() {
  yield all([
    fork(watchGetVideos),
    fork(watchAddVideo),
    fork(watchDeleteVideo),
    fork(watchEditVideo),
    fork(watchUpdateVideo),
  ]);
}

export default videoSaga;
