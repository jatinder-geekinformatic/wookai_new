import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import { GET_TIME_ZONES } from './actionTypes';
import { apiError, setTimeZones } from './actions';
import { httpGet } from '../../utils/http';
import { TIMEZONES_ENDPOINT } from '../../config/endPoints';

function* getTimeZones() {
  try {
    let timeZoneState = yield select(getTimeZone);
    if(timeZoneState.timeZones.length !== 0) return;
    const res = yield httpGet(TIMEZONES_ENDPOINT);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setTimeZones(res.data));
  } catch (error) {
    yield put(apiError(error));
  }
}

const getTimeZone = (state) => state.TimeZone;

export function* watchGetTimeZones() {
  yield takeEvery(GET_TIME_ZONES, getTimeZones);
}

function* timeZoneSaga() {
  yield all([fork(watchGetTimeZones)]);
}

export default timeZoneSaga;
