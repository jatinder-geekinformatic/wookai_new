import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import { EDIT_AD, UPDATE_AD } from './actionTypes';
import { setAd, apiError } from './actions';
import { httpGet, httpPut } from '../../utils/http';
import { ADS_ENDPOINT } from '../../config/endPoints';

function* editAd({ payload: { id } }) {
  try {
    const res = yield httpGet(`${ADS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(
      setAd({
        field: 'bottom',
        value: res.data.bottom,
      })
    );
    yield put(
      setAd({
        field: 'right_side_1',
        value: res.data.right_side_1,
      })
    );
    yield put(
      setAd({
        field: 'right_side_2',
        value: res.data.right_side_2,
      })
    );
    yield put(
      setAd({
        field: 'google_analytics',
        value: res.data.google_analytics,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateAd({ payload: { id } }) {
  try {
    const setting = yield select(getAd);
    const res = yield httpPut(`${ADS_ENDPOINT}/${id}`, setting);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getAd = (state) => state.Ad.ad;

export function* watchEditAd() {
  yield takeEvery(EDIT_AD, editAd);
}

export function* watchUpdateAd() {
  yield takeEvery(UPDATE_AD, updateAd);
}

function* adSaga() {
  yield all([fork(watchEditAd), fork(watchUpdateAd)]);
}

export default adSaga;
