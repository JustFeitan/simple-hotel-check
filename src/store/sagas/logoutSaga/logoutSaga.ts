import {put, takeLatest} from "redux-saga/effects";
import {push} from 'redux-first-history';
import {authActions} from "../../reducers/authSlice";


export function* logoutUser() {
    yield put(authActions.setUser(null));
    localStorage.removeItem('user');
    //yield put(push('/login'));
}

export function* watchLogoutUser() {
    yield takeLatest(authActions.logout.type, logoutUser)
}

