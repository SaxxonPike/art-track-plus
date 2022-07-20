import './app.scss';
import React from 'react';
import AppRoutes from "./app-routes";
import AlertModal from "./components/modals/alert-modal";
import InputModal from "./components/modals/input-modal";
import OkCancelModal from "./components/modals/ok-cancel-modal";
import YesNoCancelModal from "./components/modals/yes-no-cancel-modal";
import {AppContext} from "./app-context";
import {AppState} from "./app-state";

export default class App extends React.Component<unknown, AppState> {
    appContext: AppContext;

    constructor(props) {
        super(props);

        const getAppState = () => this.state;
        const setAppState = newState => this.setState(newState);
        this.appContext = new AppContext(getAppState, setAppState);
        this.state = {};
    }

    render() {
        return (
            <>
                <AlertModal appContext={this.appContext}/>
                <InputModal appContext={this.appContext}/>
                <OkCancelModal appContext={this.appContext}/>
                <YesNoCancelModal appContext={this.appContext}/>
                <AppRoutes appContext={this.appContext}/>
            </>
        );
    }
}

