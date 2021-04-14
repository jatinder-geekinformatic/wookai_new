import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import { EDIT_SETTING, UPDATE_SETTING } from './actionTypes';
import { setSetting, apiError } from './actions';
import { httpGet, httpPut } from '../../utils/http';
import { SETTINGS_ENDPOINT } from '../../config/endPoints';

function* editSetting({ payload: { id } }) {
  try {
    const res = yield httpGet(`${SETTINGS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(
      setSetting({
        field: 'contact_form_to_email',
        value: res.data.contact_form_to_email,
      })
    );
    yield put(
      setSetting({
        field: 'cheddar_getter_email',
        value: res.data.cheddar_getter_email,
      })
    );
    yield put(
      setSetting({
        field: 'cheddar_getter_password',
        value: res.data.cheddar_getter_password,
      })
    );
    yield put(
      setSetting({
        field: 'cheddar_getter_product',
        value: res.data.cheddar_getter_product,
      })
    );
    yield put(
      setSetting({
        field: 'cheddar_getter_host',
        value: res.data.cheddar_getter_host,
      })
    );
    yield put(
      setSetting({
        field: 'cheddar_getter_secret_key',
        value: res.data.cheddar_getter_secret_key,
      })
    );
    yield put(
      setSetting({
        field: 'leaddyno_secret_key',
        value: res.data.leaddyno_secret_key,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateSetting({ payload: { id } }) {
  try {
    const setting = yield select(getSetting);
    const res = yield httpPut(`${SETTINGS_ENDPOINT}/${id}`, setting);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getSetting = (state) => state.Setting.setting;

export function* watchEditSetting() {
  yield takeEvery(EDIT_SETTING, editSetting);
}

export function* watchUpdateSetting() {
  yield takeEvery(UPDATE_SETTING, updateSetting);
}

function* settingSaga() {
  yield all([fork(watchEditSetting), fork(watchUpdateSetting)]);
}

export default settingSaga;
