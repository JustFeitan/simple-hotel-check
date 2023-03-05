import {PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";
import {call, put, takeLatest} from "redux-saga/effects";
import {authActions} from "../../reducers/authSlice";
import {push} from 'redux-first-history';
import {isErrorWithMessage} from "../../../helpers/isErrorWithMessage";

export const wait = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

export function* loginUser(action: PayloadAction<IUser>) {
    try {
        yield put(authActions.setUserLoading());
        yield put(authActions.setUser(action.payload));
        localStorage.setItem('user', action.payload.email)
        yield put(push('/'))
    } catch (e) {
        if (isErrorWithMessage(e)) {
            yield put(authActions.setUserError(e.message as string));
        }
    }
}

export function* watchLoginUser() {
    console.log('watch saga')
    yield takeLatest(authActions.login.type, loginUser)
}

