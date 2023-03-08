import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { hotelsService } from "../../../services/hotelsService";

import { isErrorWithMessage } from "../../../helpers/isErrorWithMessage";
import { IFavoriteHotelsRequest, IHotel } from "../../../models/hotels";
import { usersFavoriteHotelsActions, usersFavoriteHotelsSelector } from "../../reducers/usersAndFavoriteHotelsSlice";

function* workDeleteFavoriteHotelsSaga({ payload: hotelIdToDelete }: PayloadAction<number>) {
    try {
        yield put(usersFavoriteHotelsActions.setFavoriteHotelsLoading());
        const favoriteHotels: IHotel[] = yield select(usersFavoriteHotelsSelector);
        const newFavoriteHotelsArr: IHotel[] = favoriteHotels.filter((hotel) => hotel.hotelId !== hotelIdToDelete);
        yield put(usersFavoriteHotelsActions.removeFavoriteHotel(newFavoriteHotelsArr));
    } catch (e) {
        if (isErrorWithMessage(e)) {
            yield put(usersFavoriteHotelsActions.setFavoriteHotelsError(e.message));
        }
    }
}

function* workAddFavoriteHotelsSaga({ payload: newFavoriteHotel }: PayloadAction<IHotel>) {
    try {
        yield put(usersFavoriteHotelsActions.setFavoriteHotelsLoading());
        yield put(usersFavoriteHotelsActions.addFavoriteHotels(newFavoriteHotel));
    } catch (e) {
        if (isErrorWithMessage(e)) {
            yield put(usersFavoriteHotelsActions.setFavoriteHotelsError(e.message));
        }
    }
}

function* workUpdateHotelsByIdAndDatesSaga({
    payload: favoriteHotelsRequestData,
}: PayloadAction<IFavoriteHotelsRequest>) {
    try {
        yield put(usersFavoriteHotelsActions.setFavoriteHotelsLoading());
        const favoriteHotels: IHotel[] = yield select(usersFavoriteHotelsSelector);
        const newFavoriteHotelsResponse: AxiosResponse<IHotel>[] = yield all(
            favoriteHotels.map((hotel) =>
                call(hotelsService.getHotelsByIdAndDates, {
                    ...favoriteHotelsRequestData,
                    hotelId: hotel.hotelId,
                })
            )
        );
        const newFavoriteHotels = newFavoriteHotelsResponse
            .map((hotel) => hotel.data)
            .filter((hotel) => hotel !== null);
        yield put(usersFavoriteHotelsActions.setFavoriteHotels(newFavoriteHotels));
    } catch (e) {
        if (isErrorWithMessage(e)) {
        }
    }
}

export function* watchAddFavoriteHotelsSaga() {
    yield takeLatest(usersFavoriteHotelsActions.addFavoriteHotelMutation.type, workAddFavoriteHotelsSaga);
}

export function* watchDeleteFavoriteHotelsSaga() {
    yield takeLatest(usersFavoriteHotelsActions.removeFavoriteHotelMutation.type, workDeleteFavoriteHotelsSaga);
}

export function* watchUpdateHotelsByIdAndDatesSaga() {
    yield takeLatest(usersFavoriteHotelsActions.updateFavoriteHotelsMutation.type, workUpdateHotelsByIdAndDatesSaga);
}
