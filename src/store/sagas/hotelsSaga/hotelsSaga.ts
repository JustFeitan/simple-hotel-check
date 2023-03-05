import {call, cancel, fork, put, select, take} from "redux-saga/effects";
import {hotelsService} from "../../../services/hotelsService";
import {findHotelsActions, requestHotelsDataSelector} from "../../reducers/hotelsSlice";
import {FindHotelsRequest} from "../../../models/hotels/FindHotelsRequest";
import {IHotel} from "../../../models/hotels/IHotel";
import {Task} from "redux-saga";
import {isErrorWithMessage} from "../../../helpers/isErrorWithMessage";

function* workHotelsSaga(signal: AbortSignal) {
    try {
        console.log('hotels start');
        yield put(findHotelsActions.setHotelsLoading());
        const requestHotels: FindHotelsRequest = yield select(requestHotelsDataSelector);
        const hotels: IHotel[] = yield call(hotelsService.getHotelsByLocationAndDates, requestHotels);
        yield put(findHotelsActions.setHotels(hotels))

    } catch (e) {
        if (isErrorWithMessage(e)) {
            yield put(findHotelsActions.setHotelsError(e.message))
        }
    }


}

export function* watchHotelsSaga() {
    let task: Task | null = null;
    let abortController = new AbortController();
    while (true) {
        yield take(findHotelsActions.getHotelsByLocationAndDates.type);
        if (task) {
            abortController.abort();
            yield cancel(task);

        }
        task = yield fork(workHotelsSaga, abortController.signal)
    }

}
