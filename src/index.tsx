import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {history, store} from "./store/store";
import {Provider} from "react-redux";
import {HistoryRouter} from "redux-first-history/rr6";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <App/>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>
);

