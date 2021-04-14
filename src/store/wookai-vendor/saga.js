import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_WOOKAI_VENDORS,
  ADD_WOOKAI_VENDOR,
  DELETE_WOOKAI_VENDOR,
  EDIT_WOOKAI_VENDOR,
  UPDATE_WOOKAI_VENDOR,
} from './actionTypes';
import {
  setWookaiVendors,
  emptyWookaiVendor,
  setWookaiVendor,
  apiError,
  getWookaiVendors as fetchWookaiVendors,
  setWookaiVendorFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { WOOKAI_VENDORS_ENDPOINT } from '../../config/endPoints';

function* getWookaiVendors() {
  try {
    const wookaiVendorState = yield select(getWookaiVendor);
    let URL = WOOKAI_VENDORS_ENDPOINT;
    URL += `?offSet=${wookaiVendorState.filter.offSet}`;
    URL += `&limit=${wookaiVendorState.filter.limit}`;
    URL += `&query=${wookaiVendorState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setWookaiVendors(res.data.records));
    yield put(
      setWookaiVendorFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addWookaiVendor() {
  try {
    const wookaiVendorState = yield select(getWookaiVendor);
    const wookaiVendor = wookaiVendorState.wookaiVendor;
    const res = yield httpPost(WOOKAI_VENDORS_ENDPOINT, wookaiVendor);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyWookaiVendor());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteWookaiVendor({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${WOOKAI_VENDORS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchWookaiVendors());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editWookaiVendor({ payload: { id } }) {
  try {
    const res = yield httpGet(`${WOOKAI_VENDORS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setWookaiVendor({ field: 'food_format', value: res.data.food_format }));
    yield put(
      setWookaiVendor({ field: 'vendor_email', value: res.data.vendor_email })
    );
    yield put(setWookaiVendor({ field: 'vendor_name', value: res.data.vendor_name }));
    yield put(
      setWookaiVendor({
        field: 'customer_department',
        value: res.data.customer_department,
      })
    );
    yield put(
      setWookaiVendor({ field: 'vendor_phone', value: res.data.vendor_phone })
    );
    yield put(
      setWookaiVendor({
        field: 'supplier_username',
        value: res.data.supplier_username,
      })
    );
    yield put(
      setWookaiVendor({
        field: 'supplier_password',
        value: res.data.supplier_password,
      })
    );
    yield put(setWookaiVendor({ field: 'distributor', value: res.data.distributor }));
    yield put(
      setWookaiVendor({ field: 'ordering_url', value: res.data.ordering_url })
    );
    yield put(
      setWookaiVendor({
        field: 'transportation_cost',
        value: res.data.transportation_cost,
      })
    );
    yield put(
      setWookaiVendor({
        field: 'minimum_order_amount',
        value: res.data.minimum_order_amount,
      })
    );
    yield put(
      setWookaiVendor({
        field: 'vendor_rebate_type',
        value: res.data.vendor_rebate_type,
      })
    );
    yield put(
      setWookaiVendor({ field: 'rebate_price', value: res.data.rebate_price })
    );
    yield put(
      setWookaiVendor({
        field: 'miscellaneous_cost',
        value: res.data.miscellaneous_cost,
      })
    );
    yield put(
      setWookaiVendor({
        field: 'enable_deliver_date',
        value: res.data.enable_deliver_date,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateWookaiVendor({ payload: { id } }) {
  try {
    const wookaiVendorState = yield select(getWookaiVendor);
    const wookaiVendor = wookaiVendorState.wookaiVendor;
    const res = yield httpPut(`${WOOKAI_VENDORS_ENDPOINT}/${id}`, wookaiVendor);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getWookaiVendor = (state) => state.WookaiVendor;

export function* watchgetWookaiVendors() {
  yield takeEvery(GET_WOOKAI_VENDORS, getWookaiVendors);
}

export function* watchAddWookaiVendor() {
  yield takeEvery(ADD_WOOKAI_VENDOR, addWookaiVendor);
}

export function* watchDeleteWookaiVendor() {
  yield takeEvery(DELETE_WOOKAI_VENDOR, deleteWookaiVendor);
}

export function* watchEditWookaiVendor() {
  yield takeEvery(EDIT_WOOKAI_VENDOR, editWookaiVendor);
}

export function* watchUpdateWookaiVendor() {
  yield takeEvery(UPDATE_WOOKAI_VENDOR, updateWookaiVendor);
}

function* wookaiVendorSaga() {
  yield all([
    fork(watchgetWookaiVendors),
    fork(watchAddWookaiVendor),
    fork(watchDeleteWookaiVendor),
    fork(watchEditWookaiVendor),
    fork(watchUpdateWookaiVendor),
  ]);
}

export default wookaiVendorSaga;
