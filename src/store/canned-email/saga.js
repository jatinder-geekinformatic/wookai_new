import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_CANNED_EMAILS,
  ADD_CANNED_EMAIL,
  DELETE_CANNED_EMAIL,
  EDIT_CANNED_EMAIL,
  UPDATE_CANNED_EMAIL,
} from './actionTypes';
import {
  setCannedEmails,
  emptyCannedEmail,
  setCannedEmail,
  apiError,
  getCannedEmails as fetchCannedEmails,
  setCannedEmailFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { CANNED_EMAILS_ENDPOINT } from '../../config/endPoints';

function* getCannedEmails() {
  try {
    const cannedEmailState = yield select(getCannedEmail);
    let URL = CANNED_EMAILS_ENDPOINT;
    URL += `?offSet=${cannedEmailState.filter.offSet}`;
    URL += `&limit=${cannedEmailState.filter.limit}`;
    URL += `&query=${cannedEmailState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setCannedEmails(res.data.records));
    yield put(
      setCannedEmailFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addCannedEmail() {
  try {
    const cannedEmailState = yield select(getCannedEmail);
    const cannedEmail = cannedEmailState.cannedEmail;
    const res = yield httpPost(CANNED_EMAILS_ENDPOINT, cannedEmail);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyCannedEmail());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteCannedEmail({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${CANNED_EMAILS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchCannedEmails());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editCannedEmail({ payload: { id } }) {
  try {
    const res = yield httpGet(`${CANNED_EMAILS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(
      setCannedEmail({ field: 'email_name', value: res.data.email_name })
    );
    yield put(setCannedEmail({ field: 'from_name', value: res.data.from_name }));
    yield put(setCannedEmail({ field: 'content', value: res.data.content }));
    yield put(
      setCannedEmail({ field: 'from_email', value: res.data.from_email })
    );
    yield put(setCannedEmail({ field: 'subject', value: res.data.subject }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateCannedEmail({ payload: { id } }) {
  try {
    const cannedEmailState = yield select(getCannedEmail);
    const cannedEmail = cannedEmailState.cannedEmail;
    const res = yield httpPut(`${CANNED_EMAILS_ENDPOINT}/${id}`, cannedEmail);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getCannedEmail = (state) => state.CannedEmail;

export function* watchGetCannedEmails() {
  yield takeEvery(GET_CANNED_EMAILS, getCannedEmails);
}

export function* watchAddCannedEmail() {
  yield takeEvery(ADD_CANNED_EMAIL, addCannedEmail);
}

export function* watchDeleteCannedEmail() {
  yield takeEvery(DELETE_CANNED_EMAIL, deleteCannedEmail);
}

export function* watchEditCannedEmail() {
  yield takeEvery(EDIT_CANNED_EMAIL, editCannedEmail);
}

export function* watchUpdateCannedEmail() {
  yield takeEvery(UPDATE_CANNED_EMAIL, updateCannedEmail);
}

function* cannedEmailSaga() {
  yield all([
    fork(watchGetCannedEmails),
    fork(watchAddCannedEmail),
    fork(watchDeleteCannedEmail),
    fork(watchEditCannedEmail),
    fork(watchUpdateCannedEmail),
  ]);
}

export default cannedEmailSaga;
