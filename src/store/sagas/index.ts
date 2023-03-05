import {all, call, spawn} from "redux-saga/effects";
import {watchLoginUser} from "./loginSaga/loginSaga";
import {watchLogoutUser} from "./logoutSaga/logoutSaga";
import {watchHotelsSaga} from "./hotelsSaga/hotelsSaga";


export default function* rootSaga() {
    const sagas = [watchLoginUser, watchLogoutUser, watchHotelsSaga]

    yield all(sagas.map(saga => {
        return spawn(function* () {
            while (true) {
                try {
                    yield call(saga);
                    break;
                } catch (e) {
                    console.log(e)
                }
            }
        })
    }))


}
