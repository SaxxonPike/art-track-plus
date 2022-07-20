import React from "react";
import {Button, Form, Modal, ModalProps} from "react-bootstrap";
import CloseIcon from "../../icons/close-icon";

export interface ModalTemplateProps extends ModalProps {
    buttons?: React.ReactNode | null,
    title: string,
    children?: React.ReactNode | null,
    onClose?: () => void,
    onHide?: () => void,
}

export default function ModalTemplate(props: ModalTemplateProps) {
    const {children, title, buttons, onClose, ...restProps} = props;
    return (
        <Modal {...restProps} onHide={onClose}>
            <Modal.Header>
                <h5 className={"modal-title"}>
                    {title}
                </h5>
                <Button type={"button"}
                        className={"close"}
                        data-dismiss={"modal"}
                        aria-label={"Close"}
                        onClick={onClose}>
                    <span aria-hidden={"true"}>
                        <CloseIcon/>
                    </span>
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {children}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {buttons}
            </Modal.Footer>
        </Modal>
    )
}