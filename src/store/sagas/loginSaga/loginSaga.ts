import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "redux-first-history";
import { put, takeEvery } from "redux-saga/effects";

import { isErrorWithMessage } from "../../../helpers/isErrorWithMessage";
import { IUser } from "../../../models/IUser";
import { authActions } from "../../reducers/authSlice";

export const wait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export function* loginUser(action: PayloadAction<IUser>) {
    try {
        yield put(authActions.setUserLoading());
        yield put(authActions.setUser(action.payload));
        localStorage.setItem("user", action.payload.email);
        yield put(push("/"));
    } catch (e) {
        if (isErrorWithMessage(e)) {
            yield put(authActions.setUserError(e.message as string));
        }
    }
}

export function* watchLoginUser() {
    yield takeEvery(authActions.login.type, loginUser);
}
