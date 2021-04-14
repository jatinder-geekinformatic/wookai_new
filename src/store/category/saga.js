import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORIES_LIST
} from './actionTypes';
import {
  setCategoriesList,
  setCategories,
  emptyCategory,
  setCategory,
  apiError,
  getCategories as fetchCategories,
  setCategoryFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { CATEGORIES_ENDPOINT } from '../../config/endPoints';

function* getCategories() {
  try {
    const categoryState = yield select(getCategory);
    let URL = CATEGORIES_ENDPOINT;
    URL += `?offSet=${categoryState.filter.offSet}`;
    URL += `&limit=${categoryState.filter.limit}`;
    URL += `&query=${categoryState.filter.query}`;

    const res = yield httpGet(URL);

    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setCategories(res.data.records));
    yield put(
      setCategoryFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* getCategoriesList() {
  try {
    let URL = `${CATEGORIES_ENDPOINT}/get/list`;
    const res = yield httpGet(URL);

    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    yield put(setCategoriesList(res.data));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addCategory() {
  try {
    const categoryState = yield select(getCategory);
    const category = categoryState.category;
    const res = yield httpPost(CATEGORIES_ENDPOINT, category);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptyCategory());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteCategory({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${CATEGORIES_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchCategories());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editCategory({ payload: { id } }) {
  try {
    const res = yield httpGet(`${CATEGORIES_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setCategory({ field: 'category_name', value: res.data.category_name }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateCategory({ payload: { id } }) {
  try {
    const categoryState = yield select(getCategory);
    const category = categoryState.category;
    const res = yield httpPut(`${CATEGORIES_ENDPOINT}/${id}`, category);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getCategory = (state) => state.Category;

export function* watchGetCategories() {
  yield takeEvery(GET_CATEGORIES, getCategories);
}

export function* watchGetCategoriesList() {
  yield takeEvery(GET_CATEGORIES_LIST, getCategoriesList);
}

export function* watchAddCategory() {
  yield takeEvery(ADD_CATEGORY, addCategory);
}

export function* watchDeleteCategory() {
  yield takeEvery(DELETE_CATEGORY, deleteCategory);
}

export function* watchEditCategory() {
  yield takeEvery(EDIT_CATEGORY, editCategory);
}

export function* watchUpdateCategory() {
  yield takeEvery(UPDATE_CATEGORY, updateCategory);
}

function* categorySaga() {
  yield all([
    fork(watchGetCategories),
    fork(watchAddCategory),
    fork(watchDeleteCategory),
    fork(watchEditCategory),
    fork(watchUpdateCategory),
    fork(watchGetCategoriesList)
  ]);
}

export default categorySaga;
