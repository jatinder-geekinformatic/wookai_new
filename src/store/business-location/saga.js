import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_BUSINESS_LOCATIONS,
  ADD_BUSINESS_LOCATION,
  DELETE_BUSINESS_LOCATION,
  EDIT_BUSINESS_LOCATION,
  UPDATE_BUSINESS_LOCATION,
} from './actionTypes';
import {
  setBusinessLocations,
  emptyBusinessLocation,
  setBusinessLocation,
  apiError,
  getBusinessLocations as fetchBusinessLocations,
  setBusinessLocationFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { BUSINESS_LOCATIONS_ENDPOINT } from '../../config/endPoints';
import { successToaster, errorToaster } from "../../components/Common/Toaster";

function* getBusinessLocations() {
  try {
    const businessLocationState = yield select(getBusinessLocation);
    let URL = BUSINESS_LOCATIONS_ENDPOINT;
    URL += `?offSet=${businessLocationState.filter.offSet}`;
    URL += `&limit=${businessLocationState.filter.limit}`;
    URL += `&query=${businessLocationState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    //set business location if there is only one in local storage
    if(res.data.records.length == 1) localStorage.setItem('businessLocation', res.data.records[0].id);

    yield put(setBusinessLocations(res.data.records));
    yield put(
      setBusinessLocationFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addBusinessLocation({payload: {history}}) {
  try {
    const businessLocationsState = yield select(getBusinessLocation);
    const businessLocation = businessLocationsState.businessLocation;
    const res = yield httpPost(BUSINESS_LOCATIONS_ENDPOINT, businessLocation);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    // yield put(emptyBusinessLocation());
    // history.push('/users/list');
    successToaster('Record added', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteBusinessLocation({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${BUSINESS_LOCATIONS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchBusinessLocations());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editBusinessLocation({ payload: { id } }) {
  try {
    const res = yield httpGet(`${BUSINESS_LOCATIONS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(
      setBusinessLocation({ field: 'business_name', value: res.data.business_name })
    );
    yield put(
      setBusinessLocation({ field: 'business_address', value: res.data.business_address })
    );
    yield put(setBusinessLocation({ field: 'business_country_id', value: res.data.business_country_id }));
    yield put(
      setBusinessLocation({ field: 'business_state_id', value: res.data.business_state_id })
    );
    yield put(
      setBusinessLocation({ field: 'business_state', value: res.data.business_state })
    );
    yield put(setBusinessLocation({ field: 'business_city', value: res.data.business_city }));
    yield put(setBusinessLocation({ field: 'business_zip_code', value: res.data.business_zip_code }));
    yield put(setBusinessLocation({ field: 'par_levels_enabled', value: res.data.par_levels_enabled }));
    yield put(setBusinessLocation({ field: 'assigned_to', value: res.data.assigned_to }));
    yield put(setBusinessLocation({ field: 'is_slave', value: res.data.is_slave }));

  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateBusinessLocation({ payload: { id } }) {
  try {
    const businessLocationsState = yield select(getBusinessLocation);
    const businessLocation = businessLocationsState.businessLocation;
    const res = yield httpPut(`${BUSINESS_LOCATIONS_ENDPOINT}/${id}`, businessLocation);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getBusinessLocation = (state) => state.BusinessLocation;

export function* watchGetBusinessLocations() {
  yield takeEvery(GET_BUSINESS_LOCATIONS, getBusinessLocations);
}

export function* watchAddBusinessLocation() {
  yield takeEvery(ADD_BUSINESS_LOCATION, addBusinessLocation);
}

export function* watchDeleteBusinessLocation() {
  yield takeEvery(DELETE_BUSINESS_LOCATION, deleteBusinessLocation);
}

export function* watchEditBusinessLocation() {
  yield takeEvery(EDIT_BUSINESS_LOCATION, editBusinessLocation);
}

export function* watchUpdateBusinessLocation() {
  yield takeEvery(UPDATE_BUSINESS_LOCATION, updateBusinessLocation);
}

function* businessLocationSaga() {
  yield all([
    fork(watchGetBusinessLocations),
    fork(watchAddBusinessLocation),
    fork(watchDeleteBusinessLocation),
    fork(watchEditBusinessLocation),
    fork(watchUpdateBusinessLocation),
  ]);
}

export default businessLocationSaga;
