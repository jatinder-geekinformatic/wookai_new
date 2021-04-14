import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_ASSIGNED_REPS,
  ADD_ASSIGNED_REP,
  DELETE_ASSIGNED_REP,
  EDIT_ASSIGNED_REP,
  UPDATE_ASSIGNED_REP,
} from './actionTypes';
import {
  setAssignedReps,
  emptyAssignedRep,
  setAssignedRep,
  apiError,
  getAssignedReps as fetchAssignedReps,
  setAssignedRepFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { REP_CLIENTS_ENDPOINT } from '../../config/endPoints';
import { successToaster, errorToaster } from "../../components/Common/Toaster";

function* getAssignedReps() {
  try {
    const assignedRepState = yield select(getAssignedRep);
    let URL = REP_CLIENTS_ENDPOINT;
    URL += `?offSet=${assignedRepState.filter.offSet}`;
    URL += `&limit=${assignedRepState.filter.limit}`;
    URL += `&query=${assignedRepState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setAssignedReps(res.data.records));
    yield put(setAssignedRepFilter({
      field: 'pages',
      value: res.data.pages
    }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addAssignedRep({payload: {history}}) {
  try {
    const assignedRepState = yield select(getAssignedRep);
    const assignedRep = assignedRepState.assignedRep;
    
    let  res = yield httpPost(`${REP_CLIENTS_ENDPOINT}`, assignedRep);
   
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
    //  console.log(res.data);
      errorToaster(res.data, 'Error');
      return false;
    }

    yield put(emptyAssignedRep());
    history.push('/assignedReps/list');
    successToaster('Record added', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteAssignedRep({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${REP_CLIENTS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchAssignedReps());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editAssignedRep({ payload: { id } }) {
  try {
    const res = yield httpGet(`${REP_CLIENTS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setAssignedRep({ field: 'email', value: res.data.email }));
    yield put(setAssignedRep({ field: 'fk_vendor_id', value: res.data.fk_vendor_id }));
    yield put(
      setAssignedRep({
        field: 'fk_profile_id',
        value: res.data.fk_profile_id,
      })
    );
    yield put(setAssignedRep({ field: 'rep_portal', value: res.data.rep_portal }));
    yield put(setAssignedRep({ field: 'cell', value: res.data.cell }));

  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateAssignedRep({ payload: { history, id } }) {
  try {
    const assignedRepState = yield select(getAssignedRep);
    const assignedRep = assignedRepState.assignedRep;
    const res = yield httpPut(`${REP_CLIENTS_ENDPOINT}/${id}`, assignedRep);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    yield put(emptyAssignedRep());
    history.push('/assignedReps/list');
    successToaster('Record updated', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

const getAssignedRep = (state) => state.AssignedRep;

export function* watchGetAssignedReps() {
  yield takeEvery(GET_ASSIGNED_REPS, getAssignedReps);
}

export function* watchAddAssignedRep() {
  yield takeEvery(ADD_ASSIGNED_REP, addAssignedRep);
}

export function* watchDeleteAssignedRep() {
  yield takeEvery(DELETE_ASSIGNED_REP, deleteAssignedRep);
}

export function* watchEditAssignedRep() {
  yield takeEvery(EDIT_ASSIGNED_REP, editAssignedRep);
}

export function* watchUpdateAssignedRep() {
  yield takeEvery(UPDATE_ASSIGNED_REP, updateAssignedRep);
}

function* assignedRepSaga() {
  yield all([
    fork(watchGetAssignedReps),
    fork(watchAddAssignedRep),
    fork(watchDeleteAssignedRep),
    fork(watchEditAssignedRep),
    fork(watchUpdateAssignedRep),
  ]);
}

export default assignedRepSaga;
