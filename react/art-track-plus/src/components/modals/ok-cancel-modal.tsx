import React from "react";
import ModalTemplate, {ModalTemplateProps} from "./components/modal-template";
import ModalSecondaryButton from "./components/modal-secondary-button";
import ModalWarningButton from "./components/modal-warning-button";

export interface OkCancelModalProps extends Omit<ModalTemplateProps, "title"> {
    title?: string,
    onOk?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>
    onCancel?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>
}

export default function OkCancelModal(props: OkCancelModalProps) {
    const {buttons, title, ...props0} = props;

    const buttons0 = [
        ...buttons ?? [],
        <ModalSecondaryButton key={"cancel"} data-dismiss={"close"}>Cancel</ModalSecondaryButton>,
        <ModalWarningButton key={"ok"}>Ok</ModalWarningButton>
    ];

    return (
        <ModalTemplate buttons={buttons0} title={title ?? "Confirmation"} {...props0}/>
    )
}