import React from "react";
import {Button, Col, Form} from "react-bootstrap";
import BlockButtonGroup from "../buttons/block-button-group";
import {AppActions} from "../../app-actions";
import OkIcon from "../icons/ok-icon";
import CancelIcon from "../icons/cancel-icon";

export interface CreateParams {
    title: string
    message?: string
    actions: AppActions
    onOk: (value: string) => void
    onCancel?: () => void
    required?: boolean
}

function showPrompt({title, message, onOk, onCancel, actions, required}: CreateParams) {
    let id;
    let textRef;
    let evaluated;
    let hidden;

    const doOk = (e?) => {
        if (e) {
            e.preventDefault();
        }

        if (evaluated) {
            return;
        }

        const value = textRef.value;

        if (required && value.length < 1) {
            return;
        }

        evaluated = true;
        doHide();
        if (onOk) {
            onOk(value);
        }
    };

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
        <Form onSubmit={doOk}>
            <Form.Label>{message}</Form.Label>
            <Form.Control type={"text"} ref={r => textRef = r}/>
        </Form>
    );

    const footer = (
        <>
            <Col xs={12} sm={4}>
                <BlockButtonGroup>
                    <Button type={"button"} variant={"secondary"} onClick={doCancel}>
                        <CancelIcon/>
                        {" Cancel"}
                    </Button>
                </BlockButtonGroup>
            </Col>
            <Col xs={12} sm={4}>
                <BlockButtonGroup>
                    <Button type={"button"} variant={"primary"} onClick={doOk}>
                        <OkIcon/>
                        {" OK"}
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
        textRef.focus();
    });
}

const PromptModal = {
    showPrompt: showPrompt
}

export default PromptModal;