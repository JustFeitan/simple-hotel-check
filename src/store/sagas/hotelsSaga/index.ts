import { all, call, spawn } from "redux-saga/effects";

import { watchUpdateFavoriteHotelsByIdAndDatesSaga } from "./favoriteHotelsUserSaga";
import { watchFindHotelsSaga } from "./findHotelsSaga";
import { watchAddFavoriteHotelsSaga, watchDeleteFavoriteHotelsSaga } from "./userFavoriteHotelsSaga";

export function* hotelsSagas() {
    const hotelsSagas = [
        watchFindHotelsSaga,
        watchAddFavoriteHotelsSaga,
        watchDeleteFavoriteHotelsSaga,
        watchUpdateFavoriteHotelsByIdAndDatesSaga,
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
