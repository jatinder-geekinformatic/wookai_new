import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_SUPPLIER_REPS,
  ADD_SUPPLIER_REP,
  DELETE_SUPPLIER_REP,
  EDIT_SUPPLIER_REP,
  UPDATE_SUPPLIER_REP,
} from './actionTypes';
import {
  setSupplierReps,
  emptySupplierRep,
  setSupplierRep,
  apiError,
  getSupplierReps as fetchSupplerReps,
  setSupplierRepFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { SUPPLIER_REPS_ENDPOINT } from '../../config/endPoints';
import { successToaster, errorToaster } from "../../components/Common/Toaster";

function* getSupplierReps() {
  try {
    const suplierRepState = yield select(getSupplierRep);
    let URL = SUPPLIER_REPS_ENDPOINT;
    URL += `?offSet=${suplierRepState.filter.offSet}`;
    URL += `&limit=${suplierRepState.filter.limit}`;
    URL += `&query=${suplierRepState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setSupplierReps(res.data.records));
    yield put(setSupplierRepFilter({
      field: 'pages',
      value: res.data.pages
    }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addSupplierRep({payload: {history}}) {
  try {
    const suplierRepState = yield select(getSupplierRep);
    console.log(suplierRepState)
    const spplierRep = suplierRepState.spplierRep;
   
    let res = yield httpPost(`${SUPPLIER_REPS_ENDPOINT}`, spplierRep);
   
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
    //  console.log(res.data);
      errorToaster(res.data, 'Error');
      return false;
    }

    yield put(emptySupplierRep());
    history.push('/supplierReps/list');
    successToaster('Record added', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteSupplierRep({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${SUPPLIER_REPS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchSupplerReps());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editSupplierRep({ payload: { id } }) {
  try {
    const res = yield httpGet(`${SUPPLIER_REPS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setSupplierRep({ field: 'email', value: res.data.email }));
    yield put(setSupplierRep({ field: 'password', value: res.data.password }));
    yield put(setSupplierRep({ field: 'full_name', value: res.data.full_name }));
    yield put(setSupplierRep({ field: 'address', value: res.data.address }));
    yield put(setSupplierRep({ field: 'city', value: res.data.city }));
    yield put(setSupplierRep({ field: 'cell', value: res.data.cell }));
    yield put(setSupplierRep({ field: 'fk_state_id', value: res.data.fk_state_id }));
    yield put(setSupplierRep({ field: 'state', value: res.data.state }));
    yield put(setSupplierRep({ field: 'zip_code', value: res.data.zip_code }));
    yield put(
      setSupplierRep({ field: 'fk_country_id', value: res.data.fk_country_id })
    );
    yield put(
      setSupplierRep({ field: 'fk_timezone_id', value: res.data.fk_timezone_id })
    );
    yield put(setSupplierRep({ field: 'user_type', value: res.data.user_type }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateSupplierRep({ payload: { id, history } }) {
  try {
    const suplierRepState = yield select(getSupplierRep);
    const supplierRep = suplierRepState.supplierRep;
    const res = yield httpPut(`${SUPPLIER_REPS_ENDPOINT}/${id}`, supplierRep);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    yield put(emptySupplierRep());
    history.push('/supplierReps/list');
    successToaster('Record updated', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

const getSupplierRep = (state) => state.SupplierRep;

export function* watchGetSupplierReps() {
  yield takeEvery(GET_SUPPLIER_REPS, getSupplierReps);
}

export function* watchAddSupplierRep() {
  yield takeEvery(ADD_SUPPLIER_REP, addSupplierRep);
}

export function* watchDeleteSupplierRep() {
  yield takeEvery(DELETE_SUPPLIER_REP, deleteSupplierRep);
}

export function* watchEditSupplierRep() {
  yield takeEvery(EDIT_SUPPLIER_REP, editSupplierRep);
}

export function* watchUpdateSupplierRep() {
  yield takeEvery(UPDATE_SUPPLIER_REP, updateSupplierRep);
}

function* supplierRepSaga() {
  yield all([
    fork(watchGetSupplierReps),
    fork(watchAddSupplierRep),
    fork(watchDeleteSupplierRep),
    fork(watchEditSupplierRep),
    fork(watchUpdateSupplierRep),
  ]);
}

export default supplierRepSaga;
