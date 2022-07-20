import React from "react";
import ModalTemplate, {ModalTemplateProps} from "./components/modal-template";
import ModalPrimaryButton from "./components/modal-primary-button";
import {AppContext} from "../../app-context";

export interface AlertModalProps extends Omit<ModalTemplateProps, "title"> {
    title?: string,
    appContext?: AppContext,
    onOk?: () => boolean
}

export default function AlertModal(props: AlertModalProps) {
    const {buttons, title, appContext, ...props0} = props;
    const appState = appContext.state;

    const doHide = () => {
        appContext.setState({showAlert: false});
        console.log("did hide");
    };

    const doOk = () => {
        if (!appState.onOk || appState.onOk()) {
            doHide();
        }
    }

    const buttons0 = [
        ...buttons ?? [],
        <ModalPrimaryButton key={"ok"}
                            data-dismiss={"close"}
                            onClick={doOk}>
            Ok
        </ModalPrimaryButton>
    ];

    return (
        <ModalTemplate onClose={doHide}
                       show={appState.showAlert}
                       buttons={buttons0}
                       title={title ?? "Alert"}
                       {...props0}
        />
    );
}