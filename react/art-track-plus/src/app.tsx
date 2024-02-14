import './app.scss';
import React from 'react';
import AppRoutes from "./app-routes";
import {AppContext} from "./app-context";
import {AppState, DefaultAppState} from "./app-state";
import ToastComponent from "./components/toasts/toast-component";
import ModalComponent from "./components/modals/modal-component";
import TimerTools from "./features/tools/timer-tools";

export default class App extends React.Component<unknown, AppState> {
    private appContext: AppContext;
    private interval: number;

    constructor(props) {
        super(props);

        const getAppState = () => this.state;
        const setAppState = newState => this.setState(newState);
        this.appContext = new AppContext(getAppState, setAppState);
        this.state = DefaultAppState();
    }

    componentDidMount() {
        this.interval = TimerTools.setInterval(() => this.appContext.actions.refresh(), 2000);
    }

    componentWillUnmount() {
        TimerTools.clearInterval(this.interval);
    }

    render() {
        return (
            <>
                <ToastComponent actions={this.appContext.actions}/>
                <ModalComponent actions={this.appContext.actions}/>
                <AppRoutes appState={this.appContext.state} actions={this.appContext.actions}/>
            </>
        );
    }
}

