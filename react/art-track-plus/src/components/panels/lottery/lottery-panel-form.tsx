import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import BlockButtonGroup from "../../buttons/block-button-group";
import CancelIcon from "../../icons/cancel-icon";
import LotteryIcon from "../../icons/lottery-icon";

export interface Props {
    onChange: (Data) => void
    onCancel: () => void
    onRun: () => void
    enabled: boolean
}

function LotteryPanelForm({enabled, onChange, onCancel, onRun}: Props) {
    let seatsTextBox;
    let unseatedPreferenceCheckBox;

    function onControlChange() {
        onChange({
            seats: seatsTextBox?.value,
            unseatedPreference: unseatedPreferenceCheckBox?.checked
        });
    }

    return (
        <Form>
            <Row className={"mt-1"}>
                <Col xs={12}>
                    <Form.Group as={Row}>
                        <Col xs={2} sm={2}>
                            <Form.Label>Seats</Form.Label>
                        </Col>
                        <Col xs={10} sm={10}>
                            <Form.Control type={"text"}
                                          ref={ref => seatsTextBox = ref}
                                          onChange={onControlChange}
                                          autoFocus
                                          placeholder={"(required)"}/>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row className={"mt-3"}>
                <Col xs={2} sm={2}>
                    <Form.Label>Options</Form.Label>
                </Col>
                <Col xs={10} sm={4}>
                    <Form.Group as={Row}>
                        <Form.Check type={"checkbox"}
                                    label={"Not-yet-seated Preference"}
                                    ref={ref => unseatedPreferenceCheckBox = ref}
                                    onChange={onControlChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col xs={6}>
                    <BlockButtonGroup>
                        <Button onClick={onCancel} variant={"secondary"}>
                            <CancelIcon/>
                            {" Cancel"}
                        </Button>
                    </BlockButtonGroup>
                </Col>
                <Col xs={6}>
                    <BlockButtonGroup>
                        <Button onClick={onRun} variant={"info"} disabled={!enabled}>
                            <LotteryIcon/>
                            {" Run Lottery"}
                        </Button>
                    </BlockButtonGroup>
                </Col>
            </Row>
        </Form>
    );
}

export default LotteryPanelForm;