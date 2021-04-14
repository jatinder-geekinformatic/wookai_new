import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_BUSINESS_PROFILES,
  ADD_BUSINESS_PROFILE,
  DELETE_BUSINESS_PROFILE,
  EDIT_BUSINESS_PROFILE,
  UPDATE_BUSINESS_PROFILE,
} from './actionTypes';
import {
  setBusinessProfiles,
  emptyBusinessProfile,
  setBusinessProfile,
  apiError,
  getBusinessProfiles as fetchBusinessProfiles,
  setBusinessProfileFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { BUSINESS_PROFILES_ENDPOINT } from '../../config/endPoints';

function* getBusinessProfiles() {
  try {
    const businessProfileState = yield select(getBusinessProfile);
    let URL = BUSINESS_PROFILES_ENDPOINT;
    URL += `?offSet=${businessProfileState.filter.offSet}`;
    URL += `&limit=${businessProfileState.filter.limit}`;
    URL += `&query=${businessProfileState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setBusinessProfiles(res.data.records));
    yield put(
      setBusinessProfileFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addBusinessProfile() {
  try {
    const businessProfileState = yield select(getBusinessProfile);
    const businessProfile = businessProfileState.businessProfile;
    const res = yield httpPost(BUSINESS_PROFILES_ENDPOINT, businessProfile);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyBusinessProfile());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteBusinessProfile({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${BUSINESS_PROFILES_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchBusinessProfiles());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editBusinessProfile({ payload: { id } }) {
  try {
    const res = yield httpGet(`${BUSINESS_PROFILES_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(
      setBusinessProfile({ field: 'email_name', value: res.data.email_name })
    );
    yield put(
      setBusinessProfile({ field: 'from_name', value: res.data.from_name })
    );
    yield put(setBusinessProfile({ field: 'content', value: res.data.content }));
    yield put(
      setBusinessProfile({ field: 'from_email', value: res.data.from_email })
    );
    yield put(setBusinessProfile({ field: 'subject', value: res.data.subject }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateBusinessProfile({ payload: { id } }) {
  try {
    const businessProfileState = yield select(getBusinessProfile);
    const businessProfile = businessProfileState.businessProfile;
    const res = yield httpPut(`${BUSINESS_PROFILES_ENDPOINT}/${id}`, businessProfile);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getBusinessProfile = (state) => state.BusinessProfile;

export function* watchGetBusinessProfiles() {
  yield takeEvery(GET_BUSINESS_PROFILES, getBusinessProfiles);
}

export function* watchAddBusinessProfile() {
  yield takeEvery(ADD_BUSINESS_PROFILE, addBusinessProfile);
}

export function* watchDeleteBusinessProfile() {
  yield takeEvery(DELETE_BUSINESS_PROFILE, deleteBusinessProfile);
}

export function* watchEditBusinessProfile() {
  yield takeEvery(EDIT_BUSINESS_PROFILE, editBusinessProfile);
}

export function* watchUpdateBusinessProfile() {
  yield takeEvery(UPDATE_BUSINESS_PROFILE, updateBusinessProfile);
}

function* businessProfileSaga() {
  yield all([
    fork(watchGetBusinessProfiles),
    fork(watchAddBusinessProfile),
    fork(watchDeleteBusinessProfile),
    fork(watchEditBusinessProfile),
    fork(watchUpdateBusinessProfile),
  ]);
}

export default businessProfileSaga;
