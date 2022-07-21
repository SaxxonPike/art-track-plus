import {AppContext} from "./app-context";
import Toast from "./models/toast";
import Modal from "./models/modal";

export class AppActions {
    private context: AppContext;

    constructor(context: AppContext) {
        this.context = context;
    }

    getToasts() {
        return this.context.state.toasts;
    }

    openToast(toast: Toast) {
        const state = this.context.state;
        const id = state.toastId;
        const toasts = [...state.toasts];

        toasts.push({
            id: id,
            ...toast
        });

        this.context.setState({
            toastId: id + 1,
            toasts: toasts
        });
    }

    closeToast(toastId: number) {
        this.context.setState({
            toasts: this.context.state.toasts
                .filter(toast => toast.id != toastId)
        });
    }

    getModals() {
        return this.context.state.modals;
    }

    openModal(modal: Modal) {
        const state = this.context.state;
        const id = state.modalId;
        const modals = [...state.modals];

        modals.push({
            id: id,
            ...modal
        })

        this.context.setState({
            modalId: id + 1,
            modals: modals
        });
    }

    closeModal(modalId: number) {
        this.context.setState({
            modals: this.context.state.modals
                .filter(modal => modal.id != modalId)
        });
    }
}