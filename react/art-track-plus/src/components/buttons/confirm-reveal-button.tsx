import React, {useState} from "react";
import {Button, ButtonGroup, ButtonProps, Col, Form, Row} from "react-bootstrap";

interface Props extends ButtonProps {
    confirmText: string
}

class State {
    allowed?: boolean = false;
    exposed?: boolean = false;
}

function ConfirmRevealButton(props: Props) {
    const [state, setState] = useState<State>(new State());
    const {confirmText, variant, ...props0} = props;
    const variant0 = variant ?? "primary";

    let textbox;
    let button;
    let loaded = false;

    function doExpose() {
        setState({
            ...state,
            exposed: true,
            allowed: false
        });
    }

    function doUnExpose() {
        setState({
            ...state,
            exposed: false
        });
    }

    function doProceed() {
        if (props.onClick) {
            props.onClick(null);
        }
        doUnExpose();
    }

    function doSubmit(e) {
        e.preventDefault();
        if (state.allowed) {
            doProceed();
        }
    }

    function doChange(e) {
        const entered = e.target.value;
        setState({
            ...state,
            allowed: entered.toLowerCase() === confirmText.toLowerCase()
        });
    }

    function doKey(e) {
        if (e.keyCode == 27) {
            e.preventDefault();
            doUnExpose();
        }
    }

    function setTextbox(ref) {
        if (!textbox && !!ref) {
            ref.focus();
        }
        textbox = ref;
    }

    function setButton(ref) {
        if (loaded && !button && !!ref) {
            ref.focus();
        }
        loaded = true;
        button = ref;
    }

    return state.exposed ? (
        <Form onSubmit={doSubmit}>
            <Row prefix={"form"}>
                <Col className={"d-grid ps-3 pe-0"}>
                    <Form.Control type={"text"}
                                  placeholder={`Confirm: "${confirmText}"`}
                                  onChange={doChange}
                                  onKeyDown={doKey}
                                  ref={setTextbox}/>
                </Col>
                <Col>
                    <ButtonGroup className={"me-auto"}>
                        <Button variant={"secondary"} onClick={doUnExpose}>Cancel</Button>
                        <Button variant={variant0} onClick={doProceed} disabled={!state.allowed}>OK</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Form>
    ) : (
        <Button {...props0}
                variant={variant}
                onClick={doExpose}
                ref={setButton}
        />
    );
}

export default ConfirmRevealButton;