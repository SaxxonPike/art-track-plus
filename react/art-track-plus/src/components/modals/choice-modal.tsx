import React from "react";
import {Button, Col, Form} from "react-bootstrap";
import BlockButtonGroup from "../buttons/block-button-group";
import {AppActions} from "../../app-actions";
import OkIcon from "../icons/ok-icon";
import CancelIcon from "../icons/cancel-icon";
import CloseIcon from "../icons/close-icon";

export interface CreateParams {
    title: string
    message?: string
    actions: AppActions
    onYes?: () => void
    onNo?: () => void
    onCancel?: () => void
    hideNo?: boolean
}

function showChoice({title, message, onYes, onNo, onCancel, actions, hideNo}: CreateParams) {
    let id;
    let evaluated;
    let hidden;

    const doYes = (e?) => {
        if (e) {
            e.preventDefault();
        }

        if (evaluated) {
            return;
        }

        evaluated = true;
        doHide(e);
        if (onYes) {
            onYes();
        }
    }

    const doNo = (e?) => {
        if (e) {
            e.preventDefault();
        }

        if (evaluated) {
            return;
        }

        evaluated = true;
        doHide(e);
        if (onNo) {
            onNo();
        }
    }

    const doHide = (e?) => {
        if (e) {
            e.preventDefault();
        }

        if (hidden) {
            return;
        }

        hidden = true;
        actions.closeModal(id);
    }

    const doCancel = (e?) => {
        if (e) {
            e.preventDefault();
        }

        if (evaluated) {
            return;
        }

        evaluated = true;
        doHide();
        if (onCancel) {
            onCancel();
        }
    };

    const header = (
        <>{title}</>
    );

    const body = (
        <Form onSubmit={doYes}>
            <Form.Label>{message}</Form.Label>
        </Form>
    );

    const noButton = hideNo ? null : (
        <Col xs={12} sm={3}>
            <BlockButtonGroup>
                <Button type={"button"} variant={"secondary"} onClick={doNo}>
                    <CloseIcon/>
                    {" No"}
                </Button>
            </BlockButtonGroup>
        </Col>
    );

    const footer = (
        <>
            <Col xs={12} sm={3}>
                <BlockButtonGroup>
                    <Button type={"button"} variant={"dark"} onClick={doCancel}>
                        <CancelIcon/>
                        {" Cancel"}
                    </Button>
                </BlockButtonGroup>
            </Col>
            {noButton}
            <Col xs={12} sm={3}>
                <BlockButtonGroup>
                    <Button type={"button"} variant={"primary"} onClick={doYes}>
                        <OkIcon/>
                        {" Yes"}
                    </Button>
                </BlockButtonGroup>
            </Col>
        </>
    );

    actions.openModal({
        header: header,
        body: body,
        footer: footer,
        props: {
            onHide: () => doCancel()
        }
    }).then(i => {
        id = i;
    });
}

const ChoiceModal = {
    showChoice: showChoice
}

export default ChoiceModal;