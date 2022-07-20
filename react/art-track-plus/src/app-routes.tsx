import {Route, Routes} from "react-router-dom";
import paths from "./paths";
import ColumnsPage from "./components/pages/columns-page";
import AboutPage from "./components/pages/about-page";
import React from "react";
import CreateBackupPage from "./components/pages/create-backup-page";

export default function AppRoutes(props) {
    return (
        <Routes>
            <Route path={paths.columns} element={<ColumnsPage {...props} />}/>
            <Route path={paths.about} element={<AboutPage {...props}/>}/>
            <Route path={paths.createBackup} element={<CreateBackupPage {...props}/>}/>
        </Routes>
    );
}