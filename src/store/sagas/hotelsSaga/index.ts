import { all, call, spawn } from "redux-saga/effects";

import { watchFindHotelsSaga } from "./findHotelsSaga";
import {
    watchAddFavoriteHotelsSaga,
    watchDeleteFavoriteHotelsSaga,
    watchUpdateHotelsByIdAndDatesSaga,
} from "./userFavoriteHotelsSaga";

export function* hotelsSagas() {
    const hotelsSagas = [
        watchFindHotelsSaga,
        watchAddFavoriteHotelsSaga,
        watchDeleteFavoriteHotelsSaga,
        watchUpdateHotelsByIdAndDatesSaga,
    ];

    yield all(
        hotelsSagas.map((saga) => {
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
