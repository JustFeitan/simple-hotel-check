import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AuthRequired from "../hoc/AuthRequired";
import { HotelsPage, Layout, LoginPage } from "../pages";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <AuthRequired>
                            <HotelsPage />
                        </AuthRequired>
                    }
                />
            </Route>
            <Route
                path="/login"
                element={
                    <Suspense>
                        <LoginPage />
                    </Suspense>
                }
            />
        </Routes>
    );
};

export default AppRouter;
