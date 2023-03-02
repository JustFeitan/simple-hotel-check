import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers/index';
import rootSaga from "./sagas";

const reducer = combineReducers({
    ...reducers
})

const sagaMiddleware = createSagaMiddleware();

export const setStore = () => {
    return configureStore({
        reducer: reducer,
        middleware: getDefaultMiddleware => {
           return  getDefaultMiddleware().concat(sagaMiddleware)
        }
    })
}

export const store = setStore();
sagaMiddleware.run(rootSaga);

export type AppStore = ReturnType<typeof setStore>;
export type AppDispatch = AppStore['dispatch'];
