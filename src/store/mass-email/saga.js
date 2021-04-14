import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_MASS_EMAILS,
  ADD_MASS_EMAIL,
  DELETE_MASS_EMAIL,
  EDIT_MASS_EMAIL,
  UPDATE_MASS_EMAIL,
} from './actionTypes';
import {
  setMassEmails,
  emptyMassEmail,
  setMassEmail,
  apiError,
  getMassEmails as fetchMassEmails,
  setMassEmailFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { MASS_EMAILS_ENDPOINT } from '../../config/endPoints';

function* getMassEmails() {
  try {
    const massEmailState = yield select(getMassEmail);
    let URL = MASS_EMAILS_ENDPOINT;
    URL += `?offSet=${massEmailState.filter.offSet}`;
    URL += `&limit=${massEmailState.filter.limit}`;
    URL += `&query=${massEmailState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setMassEmails(res.data.records));
    yield put(
      setMassEmailFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addMassEmail() {
  try {
    const massEmailState = yield select(getMassEmail);
    const massEmail = massEmailState.massEmail;
    const res = yield httpPost(MASS_EMAILS_ENDPOINT, massEmail);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyMassEmail());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteMassEmail({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${MASS_EMAILS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchMassEmails());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editMassEmail({ payload: { id } }) {
  try {
    const res = yield httpGet(`${MASS_EMAILS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(
      setMassEmail({ field: 'email_name', value: res.data.email_name })
    );
    yield put(setMassEmail({ field: 'from_name', value: res.data.from_name }));
    yield put(setMassEmail({ field: 'content', value: res.data.content }));
    yield put(
      setMassEmail({ field: 'from_email', value: res.data.from_email })
    );
    yield put(setMassEmail({ field: 'subject', value: res.data.subject }));
    yield put(
      setMassEmail({ field: 'hourly_total', value: res.data.hourly_total })
    );
    yield put(setMassEmail({ field: 'user_type', value: res.data.user_type }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateMassEmail({ payload: { id } }) {
  try {
    const massEmailState = yield select(getMassEmail);
    const massEmail = massEmailState.massEmail;
    const res = yield httpPut(`${MASS_EMAILS_ENDPOINT}/${id}`, massEmail);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getMassEmail = (state) => state.MassEmail;

export function* watchGetMassEmails() {
  yield takeEvery(GET_MASS_EMAILS, getMassEmails);
}

export function* watchAddMassEmail() {
  yield takeEvery(ADD_MASS_EMAIL, addMassEmail);
}

export function* watchDeleteMassEmail() {
  yield takeEvery(DELETE_MASS_EMAIL, deleteMassEmail);
}

export function* watchEditMassEmail() {
  yield takeEvery(EDIT_MASS_EMAIL, editMassEmail);
}

export function* watchUpdateMassEmail() {
  yield takeEvery(UPDATE_MASS_EMAIL, updateMassEmail);
}

function* massEmailSaga() {
  yield all([
    fork(watchGetMassEmails),
    fork(watchAddMassEmail),
    fork(watchDeleteMassEmail),
    fork(watchEditMassEmail),
    fork(watchUpdateMassEmail),
  ]);
}

export default massEmailSaga;
