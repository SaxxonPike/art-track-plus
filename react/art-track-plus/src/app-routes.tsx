import {Route, Routes} from "react-router-dom";
import paths from "./paths";
import ColumnsPage from "./components/pages/columns-page";
import AboutPage from "./components/pages/about-page";
import React from "react";
import DatabasePage from "./components/pages/database-page";
import ReportsPage from "./components/pages/reports-page";
import ScreenTwoPage from "./components/pages/screen-two-page";
import FindPage from "./components/pages/find-page";
import ArtistPage from "./components/pages/artist-page";
import ActionsPage from "./components/pages/actions-page";
import SystemPage from "./components/pages/system-page";
import ArtistEditPage from "./components/pages/artist-edit-page";

export default function AppRoutes(props) {
    return (
        <Routes>
            <Route path={paths.columns} element={<ColumnsPage {...props} />}/>
            <Route path={paths.about} element={<AboutPage {...props}/>}/>
            <Route path={paths.database} element={<DatabasePage {...props}/>}/>
            <Route path={paths.reports} element={<ReportsPage {...props}/>}/>
            <Route path={paths.secondScreen} element={<ScreenTwoPage {...props}/>}/>
            <Route path={paths.find} element={<FindPage {...props}/>}/>
            <Route path={paths.addArtist} element={<ArtistPage {...props} artistId={0} rapidEntry={false}/>} />
            <Route path={paths.editArtist} element={<ArtistEditPage {...props} rapidEntry={false}/>} />
            <Route path={paths.actions} element={<ActionsPage {...props}/>}/>
            <Route path={paths.system} element={<SystemPage {...props}/>}/>
        </Routes>
    );
}