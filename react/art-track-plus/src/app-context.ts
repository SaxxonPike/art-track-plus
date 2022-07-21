import {AppState} from "./app-state";
import {AppActions} from "./app-actions";

export class AppContext {
    private getter: () => AppState;
    private setter: (AppState) => void;
    private _actions: AppActions;

    constructor(getter: () => AppState, setter: (AppState) => void) {
        this.getter = getter;
        this.setter = setter;
        this._actions = new AppActions(this);
    }

    get state(): AppState {
        return this.getter();
    }

    setState(newState: AppState) {
        this.setter(newState);
    }

    get actions(): AppActions {
        return this._actions;
    }
}

