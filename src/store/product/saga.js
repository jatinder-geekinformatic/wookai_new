import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  UPDATE_PRODUCT,
} from './actionTypes';
import {
  setProducts,
  emptyProduct,
  setProduct,
  apiError,
  getProducts as fetchProducts,
  setProductFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { PRODUCTS_ENDPOINT } from '../../config/endPoints';

function* getProducts() {
  try {
    const productState = yield select(getProduct);
    let URL = PRODUCTS_ENDPOINT;
    URL += `?offSet=${productState.filter.offSet}`;
    URL += `&limit=${productState.filter.limit}`;
    URL += `&query=${productState.filter.query}`;

    //get all sorts
    for(let i = 0; i < productState.sorts.length; i++){
      if(productState.sorts[i].name && productState.sorts[i].direction){
        URL += `&${productState.sorts[i].name}=${productState.sorts[i].direction}`;
      }
    }

    const res = yield httpGet(URL);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setProducts(res.data.records));
    yield put(setProductFilter({
      field: 'pages',
      value: res.data.pages
    }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addProduct() {
  try {
    const productState = yield select(getProduct);
    const product = productState.product;
    const res = yield httpPost(PRODUCTS_ENDPOINT, product);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyProduct());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteProduct({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${PRODUCTS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchProducts());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editProduct({ payload: { id } }) {
  try {
    const res = yield httpGet(`${PRODUCTS_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setProduct({ field: 'email', value: res.data.email }));
    yield put(setProduct({ field: 'password', value: res.data.password }));
    yield put(setProduct({ field: 'full_name', value: res.data.full_name }));
    yield put(
      setProduct({
        field: 'business_main_number',
        value: res.data.business_main_number,
      })
    );
    yield put(setProduct({ field: 'address', value: res.data.address }));
    yield put(setProduct({ field: 'city', value: res.data.city }));
    yield put(setProduct({ field: 'fk_state_id', value: res.data.fk_state_id }));
    yield put(setProduct({ field: 'state', value: res.data.state }));
    yield put(setProduct({ field: 'zip_code', value: res.data.zip_code }));
    yield put(
      setProduct({ field: 'fk_country_id', value: res.data.fk_country_id })
    );
    yield put(
      setProduct({ field: 'fk_timezone_id', value: res.data.fk_timezone_id })
    );
    yield put(setProduct({ field: 'website', value: res.data.website }));
    yield put(setProduct({ field: 'user_type', value: res.data.user_type }));
    yield put(
      setProduct({
        field: 'default_profile_id',
        value: res.data.default_profile_id,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateProduct({ payload: { id } }) {
  try {
    const productState = yield select(getProduct);
    const product = productState.product;
    const res = yield httpPut(`${PRODUCTS_ENDPOINT}/${id}`, product);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getProduct = (state) => state.Product;

export function* watchGetProducts() {
  yield takeEvery(GET_PRODUCTS, getProducts);
}

export function* watchAddProduct() {
  yield takeEvery(ADD_PRODUCT, addProduct);
}

export function* watchDeleteProduct() {
  yield takeEvery(DELETE_PRODUCT, deleteProduct);
}

export function* watchEditProduct() {
  yield takeEvery(EDIT_PRODUCT, editProduct);
}

export function* watchUpdateProduct() {
  yield takeEvery(UPDATE_PRODUCT, updateProduct);
}

function* productSaga() {
  yield all([
    fork(watchGetProducts),
    fork(watchAddProduct),
    fork(watchDeleteProduct),
    fork(watchEditProduct),
    fork(watchUpdateProduct),
  ]);
}

export default productSaga;
