import { AxiosError, AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { hotelsService } from "../../../services/hotelsService";

import { isAxiosErrorResponse, isErrorWithMessage, toAxiosError } from "../../../helpers/isErrorWithMessage";
import { cancelExcessRequests } from "../../../helpers/sagaHelpers/cancelExcessRequests";
import { FindHotelsRequest, IHotel } from "../../../models/hotels";
import { findHotelsActions, findHotelsRequestedDataSelector } from "../../reducers/hotelsSlice";

function* workFindHotelsSaga(signal: AbortSignal) {
    try {
        yield put(findHotelsActions.setHotelsLoading());
        const findHotelsRequestData: FindHotelsRequest = yield select(findHotelsRequestedDataSelector);
        const response: AxiosResponse<IHotel[]> = yield call(
            hotelsService.getHotelsByLocationAndDates,
            findHotelsRequestData,
            signal
        );
        yield put(findHotelsActions.setHotels(response.data));
    } catch (e) {
        const AxiosError = toAxiosError(e);
        if (isErrorWithMessage(AxiosError.response!.data)) {
            yield put(findHotelsActions.setHotelsError(AxiosError.response!.data.message));
        }
    }
}

export function* watchFindHotelsSaga() {
    yield cancelExcessRequests(findHotelsActions.getHotelsByLocationAndDates.type, workFindHotelsSaga);
}
