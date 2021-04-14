import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';
import {
  GET_SUB_CATEGORIES,
  ADD_SUB_CATEGORY,
  DELETE_SUB_CATEGORY,
  EDIT_SUB_CATEGORY,
  UPDATE_SUB_CATEGORY,
} from './actionTypes';
import {
  setSubCategories,
  emptySubCategory,
  setSubCategory,
  apiError,
  getSubCategories as fetchSubCategories,
  setSubCategoryFilter,
} from './actions';
import { httpDelete, httpGet, httpPost, httpPut } from '../../utils/http';
import { SUB_CATEGORIES_ENDPOINT } from '../../config/endPoints';

function* getSubCategories() {
  try {
    const subCategoryState = yield select(getSubCategory);
    let URL = SUB_CATEGORIES_ENDPOINT;
    URL += `?offSet=${subCategoryState.filter.offSet}`;
    URL += `&limit=${subCategoryState.filter.limit}`;
    URL += `&query=${subCategoryState.filter.query}`;

    const res = yield httpGet(URL);

    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setSubCategories(res.data.records));
    yield put(
      setSubCategoryFilter({
        field: 'pages',
        value: res.data.pages,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* addSubCategory() {
  try {
    const subCategoryState = yield select(getSubCategory);
    const subCategory = subCategoryState.subCategory;
    const res = yield httpPost(SUB_CATEGORIES_ENDPOINT, subCategory);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(emptySubCategory());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteSubCategory({ payload: { id } }) {
  try {
    const res = yield httpDelete(`${SUB_CATEGORIES_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
    console.log('shoud run');
    yield put(fetchSubCategories());
  } catch (error) {
    yield put(apiError(error));
  }
}

function* editSubCategory({ payload: { id } }) {
  try {
    const res = yield httpGet(`${SUB_CATEGORIES_ENDPOINT}/${id}`);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }

    yield put(setSubCategory({ field: 'category_name', value: res.data.category_name }));
    yield put(setSubCategory({ field: 'parent_id', value: res.data.parent_id }));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateCategory({ payload: { id } }) {
  try {
    const subCategoryState = yield select(getSubCategory);
    const subCategory = subCategoryState.subCategory;
    const res = yield httpPut(`${SUB_CATEGORIES_ENDPOINT}/${id}`, subCategory);
    console.log(res);
    if (res.status !== 200) {
      yield put(apiError(res.data.error));
      return false;
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

const getSubCategory = (state) => state.SubCategory;

export function* watchGetSubCategories() {
  yield takeEvery(GET_SUB_CATEGORIES, getSubCategories);
}

export function* watchAddSubCategory() {
  yield takeEvery(ADD_SUB_CATEGORY, addSubCategory);
}

export function* watchDeleteSubCategory() {
  yield takeEvery(DELETE_SUB_CATEGORY, deleteSubCategory);
}

export function* watchEditSubCategory() {
  yield takeEvery(EDIT_SUB_CATEGORY, editSubCategory);
}

export function* watchUpdateCategory() {
  yield takeEvery(UPDATE_SUB_CATEGORY, updateCategory);
}

function* subCategorySaga() {
  yield all([
    fork(watchGetSubCategories),
    fork(watchAddSubCategory),
    fork(watchDeleteSubCategory),
    fork(watchEditSubCategory),
    fork(watchUpdateCategory),
  ]);
}

export default subCategorySaga;
