import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_DEFAULT_PROFILES,
  GET_DEFAULT_PROFILES_LIST,
  ADD_DEFAULT_PROFILE,
  DELETE_DEFAULT_PROFILE,
  EDIT_DEFAULT_PROFILE,
  UPDATE_DEFAULT_PROFILE,
} from './actionTypes';
import {
  setDefaultProfiles,
  emptyDefaultProfile,
  setDefaultProfile,
  apiError,
  getDefaultProfiles as fetchDefaultProfiles,
  setDefaultProfileFilter,
  setDefaultProfilesList,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { DEFAULT_PROFILES_ENDPOINT } from '../../config/endPoints';

function* getDefaultProfiles() {
  try {
    const defaultProfileState = yield select(getDefaultProfile);
    let URL = DEFAULT_PROFILES_ENDPOINT;
    URL += `?offSet=${defaultProfileState.filter.offSet}`;
    URL += `&limit=${defaultProfileState.filter.limit}`;
    URL += `&query=${defaultProfileState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setDefaultProfiles(res.data.records));
    yield put(
      setDefaultProfileFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* getDefaultProfilesList() {
  try {
    let URL =`${DEFAULT_PROFILES_ENDPOINT}/list`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setDefaultProfilesList(res.data));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addDefaultProfile() {
  try {
    const defaultProfileState = yield select(getDefaultProfile);
    const defaultProfile = defaultProfileState.defaultProfile;
    const res = yield httpPost(DEFAULT_PROFILES_ENDPOINT, defaultProfile);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyDefaultProfile());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteDefaultProfile({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${DEFAULT_PROFILES_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchDefaultProfiles());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editDefaultProfile({ payload: { id } }) {
  try {
    const res = yield httpGet(`${DEFAULT_PROFILES_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(
      setDefaultProfile({ field: 'email_name', value: res.data.email_name })
    );
    yield put(
      setDefaultProfile({ field: 'from_name', value: res.data.from_name })
    );
    yield put(setDefaultProfile({ field: 'content', value: res.data.content }));
    yield put(
      setDefaultProfile({ field: 'from_email', value: res.data.from_email })
    );
    yield put(setDefaultProfile({ field: 'subject', value: res.data.subject }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateDefaultProfile({ payload: { id } }) {
  try {
    const defaultProfileState = yield select(getDefaultProfile);
    const defaultProfile = defaultProfileState.defaultProfile;
    const res = yield httpPut(`${DEFAULT_PROFILES_ENDPOINT}/${id}`, defaultProfile);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getDefaultProfile = (state) => state.DefaultProfile;

export function* watchGetDefaultProfiles() {
  yield takeEvery(GET_DEFAULT_PROFILES, getDefaultProfiles);
}

export function* watchGetDefaultProfilesList() {
  yield takeEvery(GET_DEFAULT_PROFILES_LIST, getDefaultProfilesList);
}

export function* watchAddDefaultProfile() {
  yield takeEvery(ADD_DEFAULT_PROFILE, addDefaultProfile);
}

export function* watchDeleteDefaultProfile() {
  yield takeEvery(DELETE_DEFAULT_PROFILE, deleteDefaultProfile);
}

export function* watchEditDefaultProfile() {
  yield takeEvery(EDIT_DEFAULT_PROFILE, editDefaultProfile);
}

export function* watchUpdateDefaultProfile() {
  yield takeEvery(UPDATE_DEFAULT_PROFILE, updateDefaultProfile);
}

function* defaultProfileSaga() {
  yield all([
    fork(watchGetDefaultProfiles),
    fork(watchAddDefaultProfile),
    fork(watchDeleteDefaultProfile),
    fork(watchEditDefaultProfile),
    fork(watchUpdateDefaultProfile),
    fork(watchGetDefaultProfilesList)
  ]);
}

export default defaultProfileSaga;
