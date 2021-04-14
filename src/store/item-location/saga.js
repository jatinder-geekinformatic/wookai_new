import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_ITEM_LOCATIONS_LIST,
  GET_ITEM_LOCATIONS,
  ADD_ITEM_LOCATION,
  DELETE_ITEM_LOCATION,
  EDIT_ITEM_LOCATION,
  UPDATE_ITEM_LOCATION,
} from './actionTypes';
import {
  setItemLocationsList,
  setItemLocations,
  emptyItemLocation,
  setItemLocation,
  apiError,
  getItemLocations as fetchItemLocations,
  setItemLocationFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { ITEM_LOCATIONS_ENDPOINT } from '../../config/endPoints';

function* getItemLocations() {
  try {
    const itemLocationState = yield select(getItemLocation);
    let URL = ITEM_LOCATIONS_ENDPOINT;
    URL += `?offSet=${itemLocationState.filter.offSet}`;
    URL += `&limit=${itemLocationState.filter.limit}`;
    URL += `&query=${itemLocationState.filter.query}`;

    const res = yield httpGet(URL);

    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setItemLocations(res.data.records));
    yield put(
      setItemLocationFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* getItemLocationsList() {
  try {
    let URL = `${ITEM_LOCATIONS_ENDPOINT}/get/list`;
    const res = yield httpGet(URL);

    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setItemLocationsList(res.data));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addItemLocation() {
  try {
    const itemLocationState = yield select(getItemLocation);
    const itemLocation = itemLocationState.itemLocation;
    const res = yield httpPost(ITEM_LOCATIONS_ENDPOINT, itemLocation);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyItemLocation());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteItemLocation({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${ITEM_LOCATIONS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchItemLocations());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editItemLocation({ payload: { id } }) {
  try {
    const res = yield httpGet(`${ITEM_LOCATIONS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setItemLocation({ field: 'location_name', value: res.data.location_name }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateItemLocation({ payload: { id } }) {
  try {
    const itemLocationState = yield select(getItemLocation);
    const itemLocation = itemLocationState.itemLocation;
    const res = yield httpPut(`${ITEM_LOCATIONS_ENDPOINT}/${id}`, itemLocation);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getItemLocation = (state) => state.ItemLocation;

export function* watchGetItemLocations() {
  yield takeEvery(GET_ITEM_LOCATIONS, getItemLocations);
}

export function* watchGetItemLocationsList() {
  yield takeEvery(GET_ITEM_LOCATIONS_LIST, getItemLocationsList);
}

export function* watchAddItemLocation() {
  yield takeEvery(ADD_ITEM_LOCATION, addItemLocation);
}

export function* watchDeleteItemLocation() {
  yield takeEvery(DELETE_ITEM_LOCATION, deleteItemLocation);
}

export function* watchEditItemLocation() {
  yield takeEvery(EDIT_ITEM_LOCATION, editItemLocation);
}

export function* watchUpdateItemLocation() {
  yield takeEvery(UPDATE_ITEM_LOCATION, updateItemLocation);
}

function* itemLocationSaga() {
  yield all([
    fork(watchGetItemLocations),
    fork(watchAddItemLocation),
    fork(watchDeleteItemLocation),
    fork(watchEditItemLocation),
    fork(watchUpdateItemLocation),
    fork(watchUpdateItemLocation),
    fork(watchGetItemLocationsList)
  ]);
}

export default itemLocationSaga;
