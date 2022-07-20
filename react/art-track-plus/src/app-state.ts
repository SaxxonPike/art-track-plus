export interface AppState {
    showAlert?: boolean,
    showInput?: boolean
}

export const DefaultAppState = (): AppState => ({
    showAlert: false,
    showInput: false
});

