import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./styles/global.scss";
import App from "./app";
import {BrowserRouter} from "react-router-dom";
import 'simplebar-react/dist/simplebar.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <main>
                <App/>
            </main>
        </BrowserRouter>
    </React.StrictMode>
);
