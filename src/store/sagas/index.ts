import { all, call, spawn } from "redux-saga/effects";

import { hotelsSagas } from "./hotelsSaga";
import { watchLoginUser } from "./loginSaga/loginSaga";
import { watchLogoutUser } from "./logoutSaga/logoutSaga";

export default function* rootSaga() {
    const sagas = [watchLoginUser, watchLogoutUser, hotelsSagas];

    yield all(
        sagas.map((saga) => {
            return spawn(function* () {
                while (true) {
                    try {
                        yield call(saga);
                        break;
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        })
    );
}
