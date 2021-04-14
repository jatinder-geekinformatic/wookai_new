import { takeEvery, fork, put, all, call, select } from "redux-saga/effects";
import {
  GET_VENDOR_ITEMS,
  ADD_VENDOR_ITEM,
  DELETE_VENDOR_ITEM,
  EDIT_VENDOR_ITEM,
  UPDATE_VENDOR_ITEM,
} from "./actionTypes";
import {
  setVendorItems,
  emptyVendorItem,
  setVendorItem,
  apiError,
  getVendorItems as fetchVendorItems,
  setVendorItemFilter,
} from "./actions";
import { httpDelete, httpGet, httpPost, httpPut } from "../../utils/http";
import { VENDOR_ITEMS_ENDPOINT } from "../../config/endPoints";
import { successToaster, errorToaster } from "../../components/Common/Toaster";

function* getVendorItems({ payload: { vendorId } }) {
  try {
    const vendorItemState = yield select(getVendorItem);
    let URL = VENDOR_ITEMS_ENDPOINT;
    URL += `/vendor/${vendorId}`;
    URL += `?offSet=${vendorItemState.filter.offSet}`;
    URL += `&limit=${vendorItemState.filter.limit}`;
    URL += `&query=${vendorItemState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setVendorItems(res.data.records));
    yield put(
      setVendorItemFilter({
        field: "pages",
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addVendorItem() {
  try {
    const vendorItemState = yield select(getVendorItem);
    const vendorItem = vendorItemState.vendorItem;
    const res = yield httpPost(VENDOR_ITEMS_ENDPOINT, vendorItem);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyVendorItem());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteVendorItem({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${VENDOR_ITEMS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log("shoud run");
    yield put(fetchVendorItems());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editVendorItem({ payload: { id } }) {
  try {
    const res = yield httpGet(`${VENDOR_ITEMS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(
      setVendorItem({ field: "item", value: res.data.item })
    );
    yield put(
      setVendorItem({ field: "each_available", value: res.data.each_available })
    );
    yield put(
      setVendorItem({ field: "pack", value: res.data.pack })
    );
    yield put(
      setVendorItem({
        field: "size",
        value: res.data.size,
      })
    );
    yield put(
      setVendorItem({ field: "brand", value: res.data.brand })
    );
    yield put(
      setVendorItem({
        field: "description",
        value: res.data.description,
      })
    );
    yield put(
      setVendorItem({
        field: "price",
        value: res.data.price,
      })
    );
    yield put(
      setVendorItem({ field: "supprebate", value: res.data.supprebate })
    );
    yield put(
      setVendorItem({ field: "supp_reb_type", value: res.data.supp_reb_type })
    );
    yield put(
      setVendorItem({
        field: "contract_price",
        value: res.data.contract_price,
      })
    );
    yield put(
      setVendorItem({
        field: "manufacturing_rebate",
        value: res.data.manufacturing_rebate,
      })
    );
    yield put(
      setVendorItem({
        field: "manufacturing_rebate_type",
        value: res.data.manufacturing_rebate_type,
      })
    );
    yield put(
      setVendorItem({ field: "rebate_exp_date", value: res.data.rebate_exp_date })
    );
    yield put(
      setVendorItem({
        field: "lead_time_item",
        value: res.data.lead_time_item,
      })
    );
    yield put(
      setVendorItem({
        field: "discount_check",
        value: res.data.discount_check,
      })
    );
    yield put(
      setVendorItem({
        field: "item_price_type",
        value: res.data.item_price_type,
      })
    );
    yield put(
      setVendorItem({
        field: "contract_price_type",
        value: res.data.contract_price_type,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateVendorItem({ payload: { id } }) {
  try {
    const vendorItemState = yield select(getVendorItem);
    const vendorItem = vendorItemState.vendorItem;
    const res = yield httpPut(`${VENDOR_ITEMS_ENDPOINT}/${id}`, vendorItem);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    successToaster('Record updated', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

const getVendorItem = (state) => state.VendorItem;

export function* watchgetVendorItems() {
  yield takeEvery(GET_VENDOR_ITEMS, getVendorItems);
}

export function* watchAddVendorItem() {
  yield takeEvery(ADD_VENDOR_ITEM, addVendorItem);
}

export function* watchDeleteVendorItem() {
  yield takeEvery(DELETE_VENDOR_ITEM, deleteVendorItem);
}

export function* watchEditVendorItem() {
  yield takeEvery(EDIT_VENDOR_ITEM, editVendorItem);
}

export function* watchUpdateVendorItem() {
  yield takeEvery(UPDATE_VENDOR_ITEM, updateVendorItem);
}

function* vendorItemSaga() {
  yield all([
    fork(watchgetVendorItems),
    fork(watchAddVendorItem),
    fork(watchDeleteVendorItem),
    fork(watchEditVendorItem),
    fork(watchUpdateVendorItem),
  ]);
}

export default vendorItemSaga;
