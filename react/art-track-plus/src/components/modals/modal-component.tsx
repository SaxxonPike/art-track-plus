import React from "react";
import {Button, Modal} from "react-bootstrap";
import CloseIcon from "../icons/close-icon";
import {AppActions} from "../../app-actions";

export interface Props {
    actions: AppActions
    onHide?: () => void
}

export default function ModalComponent(props: Props) {
    const actions = props.actions;

    const modals = actions.getModals();
    if (!modals || modals.length < 1) {
        return <></>;
    }

    const modal = modals[0];
    const doHide = () => {
        actions.closeModal(modal.id).then(() => props?.onHide());
    };

    return (
        <Modal animation={false} onHide={doHide} {...modal.props} show={true}>
            <Modal.Header>
                <h5 className={"modal-title"}>
                    {modal.header}
                </h5>
                <Button type={"button"}
                        className={"close"}
                        data-dismiss={"modal"}
                        aria-label={"Close"}
                        onClick={modal.props?.onHide ?? doHide}>
                            <span aria-hidden={"true"}>
                                <CloseIcon/>
                            </span>
                </Button>
            </Modal.Header>
            {!modal.body ? <></> :
                <Modal.Body>
                    {modal.body}
                </Modal.Body>
            }
            {!modal.footer ? <></> :
                <Modal.Footer>
                    {modal.footer}
                </Modal.Footer>
            }
        </Modal>
    );
}