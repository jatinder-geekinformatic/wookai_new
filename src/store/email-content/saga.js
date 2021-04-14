import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_EMAIL_CONTENTS,
  ADD_EMAIL_CONTENT,
  DELETE_EMAIL_CONTENT,
  EDIT_EMAIL_CONTENT,
  UPDATE_EMAIL_CONTENT,
} from './actionTypes';
import {
  setEmailContents,
  emptyEmailContent,
  setEmailContent,
  apiError,
  getEmailContents as fetchEmailContents,
  setEmailContentFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { EMAIL_CONTENTS_ENDPOINT } from '../../config/endPoints';

function* getEmailContents() {
  try {
    const emailContentState = yield select(getEmailContent);
    let URL = EMAIL_CONTENTS_ENDPOINT;
    URL += `?offSet=${emailContentState.filter.offSet}`;
    URL += `&limit=${emailContentState.filter.limit}`;
    URL += `&query=${emailContentState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setEmailContents(res.data.records));
    yield put(
      setEmailContentFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addEmailContent() {
  try {
    const emailContentState = yield select(getEmailContent);
    const emailContent = emailContentState.emailContent;
    const res = yield httpPost(EMAIL_CONTENTS_ENDPOINT, emailContent);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyEmailContent());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteEmailContent({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${EMAIL_CONTENTS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchEmailContents());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editEmailContent({ payload: { id } }) {
  try {
    const res = yield httpGet(`${EMAIL_CONTENTS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(
      setEmailContent({ field: 'email_name', value: res.data.email_name })
    );
    yield put(
      setEmailContent({ field: 'from_name', value: res.data.from_name })
    );
    yield put(setEmailContent({ field: 'content', value: res.data.content }));
    yield put(
      setEmailContent({ field: 'from_email', value: res.data.from_email })
    );
    yield put(setEmailContent({ field: 'subject', value: res.data.subject }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateEmailContent({ payload: { id } }) {
  try {
    const emailContentState = yield select(getEmailContent);
    const emailContent = emailContentState.emailContent;
    const res = yield httpPut(`${EMAIL_CONTENTS_ENDPOINT}/${id}`, emailContent);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getEmailContent = (state) => state.EmailContent;

export function* watchGetEmailContents() {
  yield takeEvery(GET_EMAIL_CONTENTS, getEmailContents);
}

export function* watchAddEmailContent() {
  yield takeEvery(ADD_EMAIL_CONTENT, addEmailContent);
}

export function* watchDeleteEmailContent() {
  yield takeEvery(DELETE_EMAIL_CONTENT, deleteEmailContent);
}

export function* watchEditEmailContent() {
  yield takeEvery(EDIT_EMAIL_CONTENT, editEmailContent);
}

export function* watchUpdateEmailContent() {
  yield takeEvery(UPDATE_EMAIL_CONTENT, updateEmailContent);
}

function* emailContentSaga() {
  yield all([
    fork(watchGetEmailContents),
    fork(watchAddEmailContent),
    fork(watchDeleteEmailContent),
    fork(watchEditEmailContent),
    fork(watchUpdateEmailContent),
  ]);
}

export default emailContentSaga;
