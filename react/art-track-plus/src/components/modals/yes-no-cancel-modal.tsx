import React from "react";
import ModalTemplate, {ModalTemplateProps} from "./components/modal-template";
import ModalSecondaryButton from "./components/modal-secondary-button";
import ModalDangerButton from "./components/modal-danger-button";
import ModalSuccessButton from "./components/modal-success-button";

export interface YesNoCancelModalProps extends Omit<ModalTemplateProps, "title"> {
    title?: string
}

export default function YesNoCancelModal(props: YesNoCancelModalProps) {
    const {buttons, title, ...props0} = props;

    const buttons0 = [
        ...buttons ?? [],
        <ModalSecondaryButton key={"cancel"} autofocus data-dismiss={"close"}>Cancel</ModalSecondaryButton>,
        <ModalDangerButton key={"no"}>No</ModalDangerButton>,
        <ModalSuccessButton key={"yes"}>Yes</ModalSuccessButton>
    ];

    return (
        <ModalTemplate buttons={buttons0} title={title ?? "Confirmation"} {...props0}/>
    )
}