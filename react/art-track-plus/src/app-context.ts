import {AppState} from "./app-state";

export class AppContext {
    getter;
    setter;

    constructor(getter: () => AppState, setter: (AppState) => void) {
        this.getter = getter;
        this.setter = setter;
    }

    get state() {
        return this.getter();
    }

    setState(newState: AppState) {
        this.setter(newState);
    }
}

