import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import { GET_CMS, ADD_CM, DELETE_CM, EDIT_CM, UPDATE_CM } from './actionTypes';
import {
  setCms,
  emptyCm,
  setCm,
  apiError,
  getCms as fetchCms,
  setCmsFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { CMS_ENDPOINT } from '../../config/endPoints';

function* getCms() {
  try {
    const cmsState = yield select(getCm);
    let URL = CMS_ENDPOINT;
    URL += `?offSet=${cmsState.filter.offSet}`;
    URL += `&limit=${cmsState.filter.limit}`;
    URL += `&query=${cmsState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setCms(res.data.records));
    yield put(
      setCmsFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addCm() {
  try {
    const cmsState = yield select(getCm);
    const cm = cmsState.cm;
    const res = yield httpPost(CMS_ENDPOINT, cm);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyCm());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteCm({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${CMS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchCms());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editCm({ payload: { id } }) {
  try {
    const res = yield httpGet(`${CMS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setCm({ field: 'heading', value: res.data.heading }));
    yield put(setCm({ field: 'content', value: res.data.content }));
    yield put(setCm({ field: 'page_slug', value: res.data.page_slug }));
    yield put(setCm({ field: 'meta_title', value: res.data.meta_title }));
    yield put(setCm({ field: 'meta_keyword', value: res.data.meta_keyword }));
    yield put(
      setCm({ field: 'meta_description', value: res.data.meta_description })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateCm({ payload: { id } }) {
  try {
    const cmsState = yield select(getCm);
    const cm = cmsState.cm;
    const res = yield httpPut(`${CMS_ENDPOINT}/${id}`, cm);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getCm = (state) => state.Cms;

export function* watchGetCms() {
  yield takeEvery(GET_CMS, getCms);
}

export function* watchAddCm() {
  yield takeEvery(ADD_CM, addCm);
}

export function* watchDeleteCm() {
  yield takeEvery(DELETE_CM, deleteCm);
}

export function* watchEditCm() {
  yield takeEvery(EDIT_CM, editCm);
}

export function* watchUpdateCm() {
  yield takeEvery(UPDATE_CM, updateCm);
}

function* cmsSaga() {
  yield all([
    fork(watchGetCms),
    fork(watchAddCm),
    fork(watchDeleteCm),
    fork(watchEditCm),
    fork(watchUpdateCm),
  ]);
}

export default cmsSaga;
