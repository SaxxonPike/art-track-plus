import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./styles/global.scss";
import App from "./app";
import store from "./store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {Container} from "react-bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <main>
                    <Container>
                        <App/>
                    </Container>
                </main>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
