import Toast from "./models/toast";
import Modal from "./models/modal";

export interface AppState {
    showAlert?: boolean
    showInput?: boolean
    toasts?: Toast[]
    toastId?: number,
    modals?: Modal[],
    modalId?: number
}

export const DefaultAppState = (): AppState => ({
    showAlert: false,
    showInput: false,
    toasts: [],
    toastId: 0,
    modals: [],
    modalId: 0
});
