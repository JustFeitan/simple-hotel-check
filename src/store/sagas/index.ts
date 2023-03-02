import {all, call, spawn} from "redux-saga/effects";


export function* loadUser() {
    console.log('awae')
}

export default function* rootSaga() {
    const sagas = [loadUser]

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
