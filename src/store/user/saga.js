import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  UPDATE_USER,
} from './actionTypes';
import {
  setUsers,
  emptyUser,
  setUser,
  apiError,
  getUsers as fetchUsers,
  setUserFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { USERS_ENDPOINT } from '../../config/endPoints';
import { successToaster, errorToaster } from "../../components/Common/Toaster";

function* getUsers() {
  try {
    const userState = yield select(getUser);
    let URL = USERS_ENDPOINT;
    URL += `?offSet=${userState.filter.offSet}`;
    URL += `&limit=${userState.filter.limit}`;
    URL += `&query=${userState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setUsers(res.data.records));
    yield put(setUserFilter({
      field: 'pages',
      value: res.data.pages
    }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addUser({payload: {history}}) {
  try {
    const userState = yield select(getUser);
    console.log(userState)
    const user = userState.user;
    
    let  res = yield httpPost(`${USERS_ENDPOINT}`, user);
   
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
    //  console.log(res.data);
      errorToaster(res.data, 'Error');
      return false;
    }

    yield put(emptyUser());
    history.push('/users/list');
    successToaster('Record added', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteUser({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${USERS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchUsers());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editUser({ payload: { id } }) {
  try {
    const res = yield httpGet(`${USERS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setUser({ field: 'email', value: res.data.email }));
    yield put(setUser({ field: 'password', value: res.data.password }));
    yield put(setUser({ field: 'full_name', value: res.data.full_name }));
    yield put(setUser({ field: 'user_type', value: res.data.user_type }));
    // yield put(
    //   setUser({
    //     field: 'fk_profile_id',
    //     value: res.data.fk_profile_id,
    //   })
    // );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateUser({ payload: { history, id } }) {
  try {
    const userState = yield select(getUser);
    const user = userState.user;
    const res = yield httpPut(`${USERS_ENDPOINT}/${id}`, user);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyUser());
    history.push('/users/list');
    successToaster('Record uodated', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

const getUser = (state) => state.User;

export function* watchGetUsers() {
  yield takeEvery(GET_USERS, getUsers);
}

export function* watchAddUser() {
  yield takeEvery(ADD_USER, addUser);
}

export function* watchDeleteUser() {
  yield takeEvery(DELETE_USER, deleteUser);
}

export function* watchEditUser() {
  yield takeEvery(EDIT_USER, editUser);
}

export function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER, updateUser);
}

function* userSaga() {
  yield all([
    fork(watchGetUsers),
    fork(watchAddUser),
    fork(watchDeleteUser),
    fork(watchEditUser),
    fork(watchUpdateUser),
  ]);
}

export default userSaga;
