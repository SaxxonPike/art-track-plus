import './app.scss';
import React from 'react';
import AppRoutes from "./app-routes";
import {AppContext} from "./app-context";
import {AppState, DefaultAppState} from "./app-state";
import ToastComponent from "./components/toasts/toast-component";
import ModalComponent from "./components/modals/modal-component";

export default class App extends React.Component<unknown, AppState> {
    appContext: AppContext;

    constructor(props) {
        super(props);

        const getAppState = () => this.state;
        const setAppState = newState => this.setState(newState);
        this.appContext = new AppContext(getAppState, setAppState);
        this.state = DefaultAppState();
    }

    render() {
        return (
            <>
                <ToastComponent actions={this.appContext.actions}/>
                <ModalComponent actions={this.appContext.actions}/>
                <AppRoutes actions={this.appContext.actions}/>
            </>
        );
    }
}

