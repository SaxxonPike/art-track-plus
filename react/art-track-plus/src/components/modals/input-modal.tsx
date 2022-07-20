import React from "react";
import ModalTemplate, {ModalTemplateProps} from "./components/modal-template";
import ModalSecondaryButton from "./components/modal-secondary-button";
import ModalPrimaryButton from "./components/modal-primary-button";
import {AppContext} from "../../app-context";

export interface InputModalProps extends Omit<ModalTemplateProps, "title"> {
    title?: string,
    onOk?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>
    onCancel?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>
    appContext?: AppContext
}

export default function InputModal(props: InputModalProps) {
    const {buttons, title, appContext, ...props0} = props;
    const appState = appContext.state;

    const buttons0 = [
        ...buttons ?? [],
        <ModalSecondaryButton key={"cancel"} data-dismiss={"close"}>Cancel</ModalSecondaryButton>,
        <ModalPrimaryButton key={"ok"}>Ok</ModalPrimaryButton>
    ];

    return (
        <ModalTemplate show={appState.showInput} buttons={buttons0} title={title ?? "Alert"} {...props0}/>
    )
}