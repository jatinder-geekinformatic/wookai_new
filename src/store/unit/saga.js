import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_UNITS,
  GET_UNITS_LIST,
  ADD_UNIT,
  DELETE_UNIT,
  EDIT_UNIT,
  UPDATE_UNIT,
} from './actionTypes';
import {
  setUnitsList,
  setUnits,
  emptyUnit,
  setUnit,
  apiError,
  getUnits as fetchUnits,
  setUnitFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { UNITS_ENDPOINT } from '../../config/endPoints';
import { successToaster, errorToaster } from "../../components/Common/Toaster";

function* getUnits() {
  try {
    const unitState = yield select(getUnit);
    let URL = UNITS_ENDPOINT;
    URL += `?offSet=${unitState.filter.offSet}`;
    URL += `&limit=${unitState.filter.limit}`;
    URL += `&query=${unitState.filter.query}`;

    const res = yield httpGet(URL);

    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setUnits(res.data.records));
    yield put(
      setUnitFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* getUnitsList() {
  try {
    let URL = `${UNITS_ENDPOINT}/get/list`;
    const res = yield httpGet(URL);

    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setUnitsList(res.data));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addUnit({payload: {history}}) {
  try {
    const unitState = yield select(getUnit);
    const unit = unitState.unit;
    const res = yield httpPost(UNITS_ENDPOINT, unit);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyUnit());
    history.push('/units/list');
    successToaster('Record added', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteUnit({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${UNITS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchUnits());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editUnit({ payload: { id } }) {
  try {
    const res = yield httpGet(`${UNITS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setUnit({ field: 'unit_name', value: res.data.unit_name }));
    yield put(
      setUnit({ field: 'unit_abbreviation', value: res.data.unit_abbreviation })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateUnit({ payload: {history,  id } }) {
  try {
    const unitState = yield select(getUnit);
    const unit = unitState.unit;
    const res = yield httpPut(`${UNITS_ENDPOINT}/${id}`, unit);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyUnit());
    history.push('/units/list');
    successToaster('Record updated', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

const getUnit = (state) => state.Unit;

export function* watchGetUnits() {
  yield takeEvery(GET_UNITS, getUnits);
}

export function* watchGetUnitsList() {
  yield takeEvery(GET_UNITS_LIST, getUnitsList);
}

export function* watchAddUnit() {
  yield takeEvery(ADD_UNIT, addUnit);
}

export function* watchDeleteUnit() {
  yield takeEvery(DELETE_UNIT, deleteUnit);
}

export function* watchEditUnit() {
  yield takeEvery(EDIT_UNIT, editUnit);
}

export function* watchUpdateUnit() {
  yield takeEvery(UPDATE_UNIT, updateUnit);
}

function* unitSaga() {
  yield all([
    fork(watchGetUnits),
    fork(watchAddUnit),
    fork(watchDeleteUnit),
    fork(watchEditUnit),
    fork(watchUpdateUnit),
    fork(watchGetUnitsList)
  ]);
}

export default unitSaga;
