import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  EDIT_ACCOUNT,
  UPDATE_ACCOUNT,
} from './actionTypes';
import {
  emptyAccount,
  setAccount,
  apiError
} from './actions';
import {  httpGet, httpPut } from '../../utils/http';
import { ACCOUNTS_ENDPOINT } from '../../config/endPoints';
import { successToaster, errorToaster } from "../../components/Common/Toaster";

function* editAccount() {
  try {
    const res = yield httpGet(`${ACCOUNTS_ENDPOINT}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setAccount({ field: 'email', value: res.data.email }));
    yield put(setAccount({ field: 'password', value: res.data.password }));
    yield put(setAccount({ field: 'full_name', value: res.data.full_name }));
    yield put(setAccount({ field: 'address', value: res.data.address }));
    yield put(setAccount({ field: 'city', value: res.data.city }));
    yield put(setAccount({ field: 'cell', value: res.data.cell }));
    yield put(setAccount({ field: 'fk_state_id', value: res.data.fk_state_id }));
    yield put(setAccount({ field: 'state', value: res.data.state }));
    yield put(setAccount({ field: 'zip_code', value: res.data.zip_code }));
    yield put(
      setAccount({ field: 'fk_country_id', value: res.data.fk_country_id })
    );
    yield put(
      setAccount({ field: 'fk_timezone_id', value: res.data.fk_timezone_id })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateAccount({ payload: {history } }) {
  try {
    const accountState = yield select(getAccount);
    const account = accountState.account;
    const res = yield httpPut(`${ACCOUNTS_ENDPOINT}`, account);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    successToaster('Record updated', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

const getAccount = (state) => state.ManageAccount;

export function* watchEditAccount() {
  yield takeEvery(EDIT_ACCOUNT, editAccount);
}

export function* watchUpdateAccount() {
  yield takeEvery(UPDATE_ACCOUNT, updateAccount);
}

function* accountSaga() {
  yield all([
    fork(watchEditAccount),
    fork(watchUpdateAccount),
  ]);
}

export default accountSaga;
