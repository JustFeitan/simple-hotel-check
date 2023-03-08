import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { hotelsService } from "../../../services/hotelsService";

import { isErrorWithMessage } from "../../../helpers/isErrorWithMessage";
import { IFavoriteHotel, IFavoriteHotelsRequest, IHotel } from "../../../models/hotels";
import { favoriteHotelsActions, favoriteHotelsSelector } from "../../reducers/favoriteHotelsSlice";
import { usersFavoriteHotelsSelector } from "../../reducers/usersAndFavoriteHotelsSlice";

function* workUpdateFavoriteHotelsByIdAndDatesSaga({
    payload: favoriteHotelsRequestData,
}: PayloadAction<IFavoriteHotelsRequest>) {
    try {
        yield put(favoriteHotelsActions.setFavoriteHotelsLoading());
        const usersFavoriteHotels: IFavoriteHotel[] = yield select(usersFavoriteHotelsSelector);
        const newFavoriteHotelsResponse: AxiosResponse<IHotel>[] = yield all(
            usersFavoriteHotels.map((hotel) =>
                call(hotelsService.getHotelsByIdAndDates, {
                    ...favoriteHotelsRequestData,
                    hotelId: hotel.hotelId,
                })
            )
        );
        const newFavoriteHotels = newFavoriteHotelsResponse
            .map((hotel) => hotel.data)
            .filter((hotel) => hotel !== null);
        if (!newFavoriteHotels.length && usersFavoriteHotels.length) {
            throw new Error("Для данных дат нет подходящих отелей из избранного");
        }
        yield put(favoriteHotelsActions.setFavoriteHotels(newFavoriteHotels));
    } catch (e) {
        if (isErrorWithMessage(e)) {
            yield put(favoriteHotelsActions.setFavoriteHotelsError(e.message));
        }
    }
}

export function* watchUpdateFavoriteHotelsByIdAndDatesSaga() {
    yield takeLatest(
        favoriteHotelsActions.updateFavoriteHotelsMutation1.type,
        workUpdateFavoriteHotelsByIdAndDatesSaga
    );
}
