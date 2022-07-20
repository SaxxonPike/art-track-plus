import {Route, Routes} from "react-router-dom";
import paths from "./paths";
import ColumnsPage from "./components/pages/columns-page";
import AboutPage from "./components/pages/about-page";
import React from "react";
import DatabasePage from "./components/pages/database-page";
import ReportsPage from "./components/pages/reports-page";

export default function AppRoutes(props) {
    return (
        <Routes>
            <Route path={paths.columns} element={<ColumnsPage {...props} />}/>
            <Route path={paths.about} element={<AboutPage {...props}/>}/>
            <Route path={paths.database} element={<DatabasePage {...props}/>}/>
            <Route path={paths.reports} element={<ReportsPage {...props}/>}/>
        </Routes>
    );
}