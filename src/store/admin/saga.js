import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_ADMINS,
  ADD_ADMIN,
  DELETE_ADMIN,
  EDIT_ADMIN,
  UPDATE_ADMIN,
} from './actionTypes';
import {
  setAdmins,
  emptyAdmin,
  setAdmin,
  apiError,
  getAdmins as fetchAdmins,
  setAdminFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { ADMINS_ENDPOINT } from '../../config/endPoints';
import { successToaster, errorToaster } from "../../components/Common/Toaster";

function* getAdmins() {
  try {
    const adminState = yield select(getAdmin);
    let URL = ADMINS_ENDPOINT;
    URL += `?offSet=${adminState.filter.offSet}`;
    URL += `&limit=${adminState.filter.limit}`;
    URL += `&query=${adminState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setAdmins(res.data.records));
    yield put(
      setAdminFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addAdmin({payload: {history}}) {
  try {
    const adminState = yield select(getAdmin);
    const admin = adminState.admin;
    const res = yield httpPost(ADMINS_ENDPOINT, admin);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyAdmin());
    history.push('/admins/list');
    successToaster('Record added', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteAdmin({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${ADMINS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchAdmins());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editAdmin({ payload: { id } }) {
  try {
    const res = yield httpGet(`${ADMINS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setAdmin({ field: 'email', value: res.data.email }));
    yield put(setAdmin({ field: 'password', value: res.data.password }));
    yield put(setAdmin({ field: 'full_name', value: res.data.full_name }));
    yield put(
      setAdmin({
        field: 'business_main_number',
        value: res.data.business_main_number,
      })
    );
    yield put(setAdmin({ field: 'address', value: res.data.address }));
    yield put(setAdmin({ field: 'city', value: res.data.city }));
    yield put(setAdmin({ field: 'fk_state_id', value: res.data.fk_state_id }));
    yield put(setAdmin({ field: 'state', value: res.data.state }));
    yield put(setAdmin({ field: 'zip_code', value: res.data.zip_code }));
    yield put(
      setAdmin({ field: 'fk_country_id', value: res.data.fk_country_id })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateAdmin({ payload: { history, id } }) {
  try {
    const adminState = yield select(getAdmin);
    const admin = adminState.admin;
    const res = yield httpPut(`${ADMINS_ENDPOINT}/${id}`, admin);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyAdmin());
    history.push('/admins/list');
    successToaster('Record updated', 'Success');

  } catch (error) {
    yield put(apiError(error));
  }
}

const getAdmin = (state) => state.Admin;

export function* watchGetAdmins() {
  yield takeEvery(GET_ADMINS, getAdmins);
}

export function* watchAddAdmin() {
  yield takeEvery(ADD_ADMIN, addAdmin);
}

export function* watchDeleteAdmin() {
  yield takeEvery(DELETE_ADMIN, deleteAdmin);
}

export function* watchEditAdmin() {
  yield takeEvery(EDIT_ADMIN, editAdmin);
}

export function* watchUpdateAdmin() {
  yield takeEvery(UPDATE_ADMIN, updateAdmin);
}

function* adminSaga() {
  yield all([
    fork(watchGetAdmins),
    fork(watchAddAdmin),
    fork(watchDeleteAdmin),
    fork(watchEditAdmin),
    fork(watchUpdateAdmin),
  ]);
}

export default adminSaga;
