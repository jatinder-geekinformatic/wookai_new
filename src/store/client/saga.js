import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_CLIENTS,
  ADD_CLIENT,
  DELETE_CLIENT,
  EDIT_CLIENT,
  UPDATE_CLIENT,
} from './actionTypes';
import {
  setClients,
  emptyClient,
  setClient,
  apiError,
  getClients as fetchClients,
  setClientFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { CLIENTS_ENDPOINT } from '../../config/endPoints';
import { successToaster, errorToaster } from "../../components/Common/Toaster";

function* getClients() {
  try {
    const clientState = yield select(getClient);
    let URL = CLIENTS_ENDPOINT;
    URL += `?offSet=${clientState.filter.offSet}`;
    URL += `&limit=${clientState.filter.limit}`;
    URL += `&query=${clientState.filter.query}`;

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setClients(res.data.records));
    yield put(setClientFilter({
      field: 'pages',
      value: res.data.pages
    }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addClient({payload: {history}}) {
  try {
    const clientState = yield select(getClient);
    console.log(clientState)
    const client = clientState.client;
   
    let res = yield httpPost(`${CLIENTS_ENDPOINT}`, client);
   
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
    //  console.log(res.data);
      errorToaster(res.data, 'Error');
      return false;
    }

    yield put(emptyClient());
    history.push('/clients/list');
    successToaster('Record added', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteClient({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${CLIENTS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchClients());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editClient({ payload: { id } }) {
  try {
    const res = yield httpGet(`${CLIENTS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setClient({ field: 'email', value: res.data.email }));
    yield put(setClient({ field: 'password', value: res.data.password }));
    yield put(setClient({ field: 'full_name', value: res.data.full_name }));
    yield put(setClient({ field: 'address', value: res.data.address }));
    yield put(setClient({ field: 'city', value: res.data.city }));
    yield put(setClient({ field: 'cell', value: res.data.cell }));
    yield put(setClient({ field: 'fk_state_id', value: res.data.fk_state_id }));
    yield put(setClient({ field: 'state', value: res.data.state }));
    yield put(setClient({ field: 'zip_code', value: res.data.zip_code }));
    yield put(
      setClient({ field: 'fk_country_id', value: res.data.fk_country_id })
    );
    yield put(
      setClient({ field: 'fk_timezone_id', value: res.data.fk_timezone_id })
    );
    yield put(setClient({ field: 'user_type', value: res.data.user_type }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateClient({ payload: { id, history } }) {
  try {
    const clientState = yield select(getClient);
    const client = clientState.client;
    const res = yield httpPut(`${CLIENTS_ENDPOINT}/${id}`, client);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    yield put(emptyClient());
    history.push('/clients/list');
    successToaster('Record updated', 'Success');
  } catch (error) {
    yield put(apiError(error));
  }
}

const getClient = (state) => state.Client;

export function* watchGetClients() {
  yield takeEvery(GET_CLIENTS, getClients);
}

export function* watchAddClient() {
  yield takeEvery(ADD_CLIENT, addClient);
}

export function* watchDeleteClient() {
  yield takeEvery(DELETE_CLIENT, deleteClient);
}

export function* watchEditClient() {
  yield takeEvery(EDIT_CLIENT, editClient);
}

export function* watchUpdateClient() {
  yield takeEvery(UPDATE_CLIENT, updateClient);
}

function* clientSaga() {
  yield all([
    fork(watchGetClients),
    fork(watchAddClient),
    fork(watchDeleteClient),
    fork(watchEditClient),
    fork(watchUpdateClient),
  ]);
}

export default clientSaga;
