import { put, takeLatest } from "redux-saga/effects";

import { authActions } from "../../reducers/authSlice";

export function* logoutUser() {
    yield put(authActions.setUser(null));
    localStorage.removeItem("user");
}

export function* watchLogoutUser() {
    yield takeLatest(authActions.logout.type, logoutUser);
}
