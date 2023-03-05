import {combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas";
import reducers from './reducers';
import {createReduxHistoryContext} from "redux-first-history";
import {createBrowserHistory} from 'history'

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});


const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    router: routerReducer,
    ...reducers,
})

export const setStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware)
        }
    })
}
export const store = setStore();
export const history = createReduxHistory(store);
sagaMiddleware.run(rootSaga);

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>
