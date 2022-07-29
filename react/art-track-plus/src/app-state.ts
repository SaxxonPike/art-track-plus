import Toast from "./models/toast";
import Modal from "./models/modal";
import Artist from "./models/artist";

export interface AppState {
    forceUpdate?: boolean
    showAlert?: boolean
    showInput?: boolean
    toasts?: Toast[]
    toastId?: number
    modals?: Modal[]
    modalId?: number
    artists?: Artist[]
}

export const DefaultAppState = (): AppState => ({
    forceUpdate: true,
    showAlert: false,
    showInput: false,
    toasts: [],
    toastId: 0,
    modals: [],
    modalId: 0,
    artists: []
});
