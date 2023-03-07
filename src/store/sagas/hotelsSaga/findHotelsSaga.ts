import { AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

import { hotelsService } from "../../../services/hotelsService";

import { isErrorWithMessage } from "../../../helpers/isErrorWithMessage";
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
        if (isErrorWithMessage(e)) {
            yield put(findHotelsActions.setHotelsError(e.message));
        }
    }
}

export function* watchFindHotelsSaga() {
    yield cancelExcessRequests(findHotelsActions.getHotelsByLocationAndDates.type, workFindHotelsSaga);
}
