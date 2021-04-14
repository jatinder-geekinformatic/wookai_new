import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_VENDORS,
  GET_VENDORS_LIST,
  ADD_VENDOR,
  DELETE_VENDOR,
  EDIT_VENDOR,
  UPDATE_VENDOR,
} from './actionTypes';
import {
  setVendorsList,
  setVendors,
  emptyVendor,
  setVendor,
  apiError,
  getVendors as fetchVendors,
  setVendorFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { VENDORS_ENDPOINT } from '../../config/endPoints';

function* getVendors() {
  try {
    const vendorState = yield select(getVendor);
    let URL = VENDORS_ENDPOINT;
    URL += `?offSet=${vendorState.filter.offSet}`;
    URL += `&limit=${vendorState.filter.limit}`;
    URL += `&query=${vendorState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setVendors(res.data.records));
    yield put(
      setVendorFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* getVendorsList() {
  try {
    let URL = `${VENDORS_ENDPOINT}/get/list`;
    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setVendorsList(res.data));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addVendor() {
  try {
    const vendorState = yield select(getVendor);
    const vendor = vendorState.vendor;
    const res = yield httpPost(VENDORS_ENDPOINT, vendor);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyVendor());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteVendor({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${VENDORS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchVendors());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editVendor({ payload: { id } }) {
  try {
    const res = yield httpGet(`${VENDORS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setVendor({ field: 'food_format', value: res.data.food_format }));
    yield put(
      setVendor({ field: 'vendor_email', value: res.data.vendor_email })
    );
    yield put(setVendor({ field: 'vendor_name', value: res.data.vendor_name }));
    yield put(
      setVendor({
        field: 'customer_department',
        value: res.data.customer_department,
      })
    );
    yield put(
      setVendor({ field: 'vendor_phone', value: res.data.vendor_phone })
    );
    yield put(
      setVendor({
        field: 'supplier_username',
        value: res.data.supplier_username,
      })
    );
    yield put(
      setVendor({
        field: 'supplier_password',
        value: res.data.supplier_password,
      })
    );
    yield put(setVendor({ field: 'distributor', value: res.data.distributor }));
    yield put(
      setVendor({ field: 'ordering_url', value: res.data.ordering_url })
    );
    yield put(
      setVendor({
        field: 'transportation_cost',
        value: res.data.transportation_cost,
      })
    );
    yield put(
      setVendor({
        field: 'minimum_order_amount',
        value: res.data.minimum_order_amount,
      })
    );
    yield put(
      setVendor({
        field: 'vendor_rebate_type',
        value: res.data.vendor_rebate_type,
      })
    );
    yield put(
      setVendor({ field: 'rebate_price', value: res.data.rebate_price })
    );
    yield put(
      setVendor({
        field: 'miscellaneous_cost',
        value: res.data.miscellaneous_cost,
      })
    );
    yield put(
      setVendor({
        field: 'enable_deliver_date',
        value: res.data.enable_deliver_date,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateVendor({ payload: { id } }) {
  try {
    const vendorState = yield select(getVendor);
    const vendor = vendorState.vendor;
    const res = yield httpPut(`${VENDORS_ENDPOINT}/${id}`, vendor);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getVendor = (state) => state.Vendor;

export function* watchgetVendors() {
  yield takeEvery(GET_VENDORS, getVendors);
}

export function* watchgetVendorsList() {
  yield takeEvery(GET_VENDORS_LIST, getVendorsList);
}

export function* watchAddVendor() {
  yield takeEvery(ADD_VENDOR, addVendor);
}

export function* watchDeleteVendor() {
  yield takeEvery(DELETE_VENDOR, deleteVendor);
}

export function* watchEditVendor() {
  yield takeEvery(EDIT_VENDOR, editVendor);
}

export function* watchUpdateVendor() {
  yield takeEvery(UPDATE_VENDOR, updateVendor);
}

function* vendorSaga() {
  yield all([
    fork(watchgetVendors),
    fork(watchAddVendor),
    fork(watchDeleteVendor),
    fork(watchEditVendor),
    fork(watchUpdateVendor),
    fork(watchgetVendorsList)
  ]);
}

export default vendorSaga;
