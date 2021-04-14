import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import { GET_COUNTRIES } from './actionTypes';
import { apiError, setCountries } from './actions';
import { httpGet } from '../../utils/http';
import { COUNTRIES_ENDPOINT } from '../../config/endPoints';

function* getCountries() {
  try {
    let countryState = yield select(getCountry);
    if(countryState.countries.length !== 0) return;
    const res = yield httpGet(COUNTRIES_ENDPOINT);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setCountries(res.data));
  } catch (error) {
    yield put(apiError(error));
  }
}

const getCountry = (state) => state.Country;

export function* watchGetCountries() {
  yield takeEvery(GET_COUNTRIES, getCountries);
}

function* countrySaga() {
  yield all([fork(watchGetCountries)]);
}

export default countrySaga;
