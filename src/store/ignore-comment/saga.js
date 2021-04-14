import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_IGNORE_COMMENTS_LIST,
  GET_IGNORE_COMMENTS,
  ADD_IGNORE_COMMENT,
  DELETE_IGNORE_COMMENT,
  EDIT_IGNORE_COMMENT,
  UPDATE_IGNORE_COMMENT,
} from './actionTypes';
import {
  setIgnoreCommentsList,
  setIgnoreComments,
  emptyIgnoreComment,
  setIgnoreComment,
  apiError,
  getIgnoreComments as fetchIgnoreComments,
  setIgnoreCommentFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { IGNORE_COMMENTS_ENDPOINT } from '../../config/endPoints';
import { successToaster, errorToaster } from "../../components/Common/Toaster";

function* getIgnoreComments() {
  try {
    const ignoreCommentState = yield select(getIgnoreComment);
    let URL = IGNORE_COMMENTS_ENDPOINT;
    URL += `?offSet=${ignoreCommentState.filter.offSet}`;
    URL += `&limit=${ignoreCommentState.filter.limit}`;
    URL += `&query=${ignoreCommentState.filter.query}`;

    const res = yield httpGet(URL);

    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setIgnoreComments(res.data.records));
    yield put(
      setIgnoreCommentFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* getIgnoreCommentsList() {
  try {
    let URL = `${IGNORE_COMMENTS_ENDPOINT}/get/list`;
    const res = yield httpGet(URL);

    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setIgnoreCommentsList(res.data));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addIgnoreComment() {
  try {
    const ignoreCommentState = yield select(getIgnoreComment);
    const ignoreComment = ignoreCommentState.ignoreComment;
    const res = yield httpPost(IGNORE_COMMENTS_ENDPOINT, ignoreComment);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyIgnoreComment());
    successToaster('Record added', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteIgnoreComment({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${IGNORE_COMMENTS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchIgnoreComments());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editIgnoreComment({ payload: { id } }) {
  try {
    const res = yield httpGet(`${IGNORE_COMMENTS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setIgnoreComment({ field: 'comment', value: res.data.comment }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateIgnoreComment({ payload: { id } }) {
  try {
    const ignoreCommentState = yield select(getIgnoreComment);
    const ignoreComment = ignoreCommentState.ignoreComment;
    const res = yield httpPut(`${IGNORE_COMMENTS_ENDPOINT}/${id}`, ignoreComment);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyIgnoreComment());
    successToaster('Record updated', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

const getIgnoreComment = (state) => state.IgnoreComment;

export function* watchGetIgnoreComments() {
  yield takeEvery(GET_IGNORE_COMMENTS, getIgnoreComments);
}

export function* watchGetIgnoreCommentsList() {
  yield takeEvery(GET_IGNORE_COMMENTS_LIST, getIgnoreCommentsList);
}

export function* watchAddIgnoreComment() {
  yield takeEvery(ADD_IGNORE_COMMENT, addIgnoreComment);
}

export function* watchDeleteIgnoreComment() {
  yield takeEvery(DELETE_IGNORE_COMMENT, deleteIgnoreComment);
}

export function* watchEditIgnoreComment() {
  yield takeEvery(EDIT_IGNORE_COMMENT, editIgnoreComment);
}

export function* watchUpdateIgnoreComment() {
  yield takeEvery(UPDATE_IGNORE_COMMENT, updateIgnoreComment);
}

function* ignoreCommentSaga() {
  yield all([
    fork(watchGetIgnoreComments),
    fork(watchAddIgnoreComment),
    fork(watchDeleteIgnoreComment),
    fork(watchEditIgnoreComment),
    fork(watchUpdateIgnoreComment),
    fork(watchGetIgnoreCommentsList)
  ]);
}

export default ignoreCommentSaga;
