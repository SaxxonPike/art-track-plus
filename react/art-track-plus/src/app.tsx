import './app.scss';
import {Component} from "react";
import React from 'react';
import {Route, Routes} from "react-router-dom";
import ColumnsPage from "./components/pages/columns-page";
import AboutPage from "./components/pages/about-page";
import {aboutPath, columnsPath} from "./paths";

class App extends Component {
    render() {
        return (
            <Routes>
                <Route path={columnsPath} element={<ColumnsPage/>}/>
                <Route path={aboutPath} element={<AboutPage/>}/>
            </Routes>
        );
    }
}

export default App;
