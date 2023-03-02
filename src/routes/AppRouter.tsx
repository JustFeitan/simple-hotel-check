import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Layout, LoginPage, HotelsPage} from "../pages";


const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<LoginPage/>}/>
                <Route path='/hotels' element={<HotelsPage/>}/>
            </Route>

        </Routes>
    );
};

export default AppRouter;
