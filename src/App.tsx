import React, { useEffect } from "react";

import "./App.scss";
import { useActions } from "./hooks/redux/useActions";
import AppRouter from "./routes/AppRouter";
import { authActions } from "./store/reducers/authSlice";

function App() {
    const { login } = useActions(authActions);
    useEffect(() => {
        if (localStorage.getItem("user")) {
            const email = localStorage.getItem("user");
            login({ email: email!, password: "" });
        }
    }, []);

    return (
        <div className="app">
            <AppRouter />
        </div>
    );
}

export default App;
