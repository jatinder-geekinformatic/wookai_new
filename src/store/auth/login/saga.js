import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { loginSuccess, logoutUserSuccess, apiError } from './actions';

//Include Both Helper File with needed methods
import { getFirebaseBackend } from '../../../helpers/firebase_helper';
import {httpPost} from '../../../utils/http';
import {AUTH_ENDPOINT} from '../../../config/endPoints';
import {successToaster} from '../../../components/Common/Toaster';

const fireBaseBackend = getFirebaseBackend();


function* loginUser({ payload: { user, history } }) {
    try {console.log(AUTH_ENDPOINT);
        const res = yield httpPost(`${AUTH_ENDPOINT}/login`, user);
        if (res.status !== 200){
            yield put(apiError(res.data.error));
            return false;
        }
        yield put(apiError(''));
        localStorage.setItem('token', res.data.token);
        yield put(loginSuccess(res.data.token));
        history.push('/dashboard');
        successToaster('You are logged in', 'Success.')
          
    } catch (error) {
        yield put(apiError(error));
    }
}

function* logoutUser({ payload: { history } }) {
    try {
         localStorage.removeItem("token");
         localStorage.removeItem("businessLocation");
         if(process.env.REACT_APP_DEFAULTAUTH === 'firebase')
         {
           const response = yield call(fireBaseBackend.logout);
           yield put(logoutUserSuccess(response));
         }
        history.push('/login');
        successToaster('You are logged out', 'Success.')
    } catch (error) {
        yield put(apiError(error));
    }
}


export function* watchUserLogin() {
    yield takeEvery(LOGIN_USER, loginUser)
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser)
}

function* authSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
    ]);
}

export default authSaga;