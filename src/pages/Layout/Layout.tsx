import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import Loader from "../../components/UI/Loader/Loader";

import "./Layout.scss";

const Layout = () => {
    return (
        <>
            <Header />
            <div className="main-container">
                <Suspense
                    fallback={
                        <div className="main-container__loader">
                            <Loader />
                        </div>
                    }
                >
                    <Outlet />
                </Suspense>
            </div>
        </>
    );
};

export default Layout;
