import { takeEvery, fork, put, all, call, select } from "redux-saga/effects";

//Account Redux states
import { REGISTER_USER } from "./actionTypes";

import { emptyRegisterUser, registerUserFailed } from "./actions";
import { httpPost } from "../../../utils/http";
import { AUTH_ENDPOINT } from "../../../config/endPoints";
import {
  successToaster,
  errorToaster,
} from "../../../components/Common/Toaster";

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { history } }) {
  try {
    const registerState = yield select(getRegister);
    const register = registerState.register;

    let res = yield httpPost(`${AUTH_ENDPOINT}/register`, register);

    if (res.status !== 200) {
      yield put(registerUserFailed(res.data.error));
      errorToaster(res.data, "Error");
      return false;
    }

    yield put(emptyRegisterUser());
    history.push("/login");
    successToaster("You have Registerd, Please login.", "Success");
  } catch (error) {
    yield put(registerUserFailed(error));
  }
}

const getRegister = (state) => state.Account;

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
