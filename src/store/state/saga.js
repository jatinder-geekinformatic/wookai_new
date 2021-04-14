import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import { GET_STATES } from './actionTypes';
import { apiError, setStates } from './actions';
import { httpGet } from '../../utils/http';
import { STATES_ENDPOINT } from '../../config/endPoints';

function* getStates() {
  try {
    let stateState = yield select(getState);
    if(stateState.states.length !== 0) return;
    const res = yield httpGet(STATES_ENDPOINT);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setStates(res.data));
  } catch (error) {
    yield put(apiError(error));
  }
}

const getState = (state) => state.State;

export function* watchGetStates() {
  yield takeEvery(GET_STATES, getStates);
}

function* stateSaga() {
  yield all([fork(watchGetStates)]);
}

export default stateSaga;
