import React from "react";
import {Toast, ToastContainer} from "react-bootstrap";
import {AppActions} from "../../app-actions";

export interface Props {
    actions: AppActions
}

export default function ToastComponent({actions}: Props) {

    const elements = actions.getToasts()
        .map((toast) => {
            return (
                <Toast show={true}
                       bg={toast.variant}
                       onClose={() => actions.closeToast(toast.id)} key={"toast" + toast.id}>
                    <Toast.Header>
                        <span className={"me-auto"}>{toast.header}</span>
                    </Toast.Header>
                    <Toast.Body>
                        {toast.body}
                    </Toast.Body>
                </Toast>
            );
        });

    return (
        <ToastContainer position={"bottom-end"}>
            {elements}
        </ToastContainer>
    );
}