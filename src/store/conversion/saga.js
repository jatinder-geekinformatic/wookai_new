import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_CONVERSIONS,
  ADD_CONVERSION,
  DELETE_CONVERSION,
  EDIT_CONVERSION,
  UPDATE_CONVERSION,
} from './actionTypes';
import {
  setConversions,
  emptyConversion,
  setConversion,
  apiError,
  getConversions as fetchConversions,
  setConversionFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { CONVERSIONS_ENDPOINT } from '../../config/endPoints';
import { successToaster, errorToaster } from "../../components/Common/Toaster";

function* getConversions() {
  try {
    const conversionState = yield select(getConversion);
    let URL = CONVERSIONS_ENDPOINT;
    URL += `?offSet=${conversionState.filter.offSet}`;
    URL += `&limit=${conversionState.filter.limit}`;
    URL += `&query=${conversionState.filter.query}`;

    const res = yield httpGet(URL);

    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setConversions(res.data.records));
    yield put(
      setConversionFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addConversion({payload: {history}}) {
  try {
    const conversionState = yield select(getConversion);
    const conversion = conversionState.conversion
    const res = yield httpPost(CONVERSIONS_ENDPOINT, conversion);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyConversion());
    history.push('/conversions/list');
    successToaster('Record added', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteConversion({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${CONVERSIONS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchConversions());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editConversion({ payload: { id } }) {
  try {
    const res = yield httpGet(`${CONVERSIONS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setConversion({ field: 'fk_unit_id1', value: res.data.fk_unit_id1 }));
    yield put(
      setConversion({ field: 'fk_unit_id2', value: res.data.fk_unit_id2 })
    );
    yield put(setConversion({ field: 'value', value: res.data.value }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateConversion({ payload: { history, id } }) {
  try {
    const conversionState = yield select(getConversion);
    const conversion = conversionState.conversion;
    const res = yield httpPut(`${CONVERSIONS_ENDPOINT}/${id}`, conversion);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyConversion());
    history.push('/conversions/list');
    successToaster('Record updated', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

const getConversion = (state) => state.Conversion;

export function* watchGetConversions() {
  yield takeEvery(GET_CONVERSIONS, getConversions);
}

export function* watchAddConversion() {
  yield takeEvery(ADD_CONVERSION, addConversion);
}

export function* watchDeleteConversion() {
  yield takeEvery(DELETE_CONVERSION, deleteConversion);
}

export function* watchEditConversion() {
  yield takeEvery(EDIT_CONVERSION, editConversion);
}

export function* watchUpdateConversion() {
  yield takeEvery(UPDATE_CONVERSION, updateConversion);
}

function* conversionSaga() {
  yield all([
    fork(watchGetConversions),
    fork(watchAddConversion),
    fork(watchDeleteConversion),
    fork(watchEditConversion),
    fork(watchUpdateConversion),
  ]);
}

export default conversionSaga;
