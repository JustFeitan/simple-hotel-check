import { PayloadAction } from "@reduxjs/toolkit";
import { put, select, takeLatest } from "redux-saga/effects";

import { isErrorWithMessage } from "../../../helpers/isErrorWithMessage";
import { IFavoriteHotel } from "../../../models/hotels";
import { usersFavoriteHotelsActions, usersFavoriteHotelsSelector } from "../../reducers/usersAndFavoriteHotelsSlice";

function* workDeleteFavoriteHotelsSaga({ payload: hotelIdToDelete }: PayloadAction<number>) {
    try {
        yield put(usersFavoriteHotelsActions.setUsersFavoriteHotelsLoading());
        const favoriteHotels: IFavoriteHotel[] = yield select(usersFavoriteHotelsSelector);
        const newFavoriteHotelsArr: IFavoriteHotel[] = favoriteHotels.filter(
            (hotel) => hotel.hotelId !== hotelIdToDelete
        );
        yield put(usersFavoriteHotelsActions.removeUsersFavoriteHotel(newFavoriteHotelsArr));
    } catch (e) {
        if (isErrorWithMessage(e)) {
            yield put(usersFavoriteHotelsActions.setUsersFavoriteHotelsError(e.message));
        }
    }
}

function* workAddFavoriteHotelsSaga({ payload: newFavoriteHotel }: PayloadAction<IFavoriteHotel>) {
    try {
        yield put(usersFavoriteHotelsActions.setUsersFavoriteHotelsLoading());
        yield put(usersFavoriteHotelsActions.addUsersFavoriteHotels(newFavoriteHotel));
    } catch (e) {
        if (isErrorWithMessage(e)) {
            yield put(usersFavoriteHotelsActions.setUsersFavoriteHotelsError(e.message));
        }
    }
}

export function* watchAddFavoriteHotelsSaga() {
    yield takeLatest(usersFavoriteHotelsActions.addUsersFavoriteHotelMutation.type, workAddFavoriteHotelsSaga);
}

export function* watchDeleteFavoriteHotelsSaga() {
    yield takeLatest(usersFavoriteHotelsActions.removeUsersFavoriteHotelMutation.type, workDeleteFavoriteHotelsSaga);
}
