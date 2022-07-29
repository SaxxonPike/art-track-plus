import {AppState} from "./app-state";
import {AppActions} from "./app-actions";
import DexieDatabase from "./features/databases/dexie-database";
import AppDataSource from "./features/databases/app-data-source";

export class AppContext {
    private getter: () => AppState;
    private setter: (AppState) => void;
    private _actions: AppActions;
    private _dataSource: AppDataSource;

    constructor(getter: () => AppState, setter: (AppState) => void) {
        this.getter = getter;
        this.setter = setter;
        this._actions = new AppActions(this);

        // Todo: make this user configurable later
        this._dataSource = new DexieDatabase({
            databaseName: "ArtTrackPlus2"
        });
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

    get dataSource(): AppDataSource {
        return this._dataSource;
    }
}

