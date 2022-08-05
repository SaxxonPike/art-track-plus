import {Button, Col, Form, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";
import DeleteIcon from "../../icons/delete-icon";
import CancelIcon from "../../icons/cancel-icon";
import SaveIcon from "../../icons/save-icon";
import React, {useEffect} from "react";
import Artist from "../../../models/artist";

export interface Props {
    artist: Artist
    onChange: (Artist) => void
    onDelete: () => void
    onCancel: () => void
    onSave: () => void
}

export default function ArtistPanelForm({artist, onChange, onDelete, onCancel, onSave}: Props) {
    let nameTextBox;
    let badgeTextBox;
    let tableTextBox;
    let roomTextBox;
    let phoneTextBox;
    let remarksTextBox;
    let lotteryEligibleCheckBox;
    let lotteryGuaranteedCheckBox;

    function convertCommaValueString(str: string) {
        if (!str)
            return "";

        return str.split(",")
            .map(s => s.trim())
            .filter(s => !!s);
    }

    function onControlChange() {
        onChange({
            ...artist,
            name: nameTextBox?.value,
            badgeNumber: badgeTextBox?.value,
            tableNumber: tableTextBox?.value,
            roomNumber: roomTextBox?.value,
            phone: phoneTextBox?.value,
            remarks: remarksTextBox?.value,
            lotteryEligible: lotteryEligibleCheckBox?.checked,
            lotteryGuaranteed: lotteryGuaranteedCheckBox?.checked
        });
    }

    useEffect(
        () => {
            if (!artist?.id) {
                // nothing here yet
            } else {
                tableTextBox.value = artist?.tableNumber ?? "";
                roomTextBox.value = artist?.roomNumber ?? "";
            }

            nameTextBox.value = artist?.name ?? "";
            badgeTextBox.value = artist?.badgeNumber ?? "";
            phoneTextBox.value = artist?.phone ?? "";
            remarksTextBox.value = artist?.remarks ?? "";
            lotteryEligibleCheckBox.checked = artist?.lotteryEligible ?? false;
            lotteryGuaranteedCheckBox.checked = artist?.lotteryGuaranteed ?? false;
        },
        [
            artist,
            nameTextBox,
            badgeTextBox,
            phoneTextBox,
            remarksTextBox,
            tableTextBox,
            roomTextBox,
            lotteryEligibleCheckBox,
            lotteryGuaranteedCheckBox
        ]
    );

    // Full info available only for existing records.
    const infoBlock = artist.id ? (
        <>
            <Col xs={2} sm={0}>
                {/* spacing */}
            </Col>
            <Col xs={10} sm={6} className={"mt-2 mt-sm-0"}>
                <Form.Group as={Row}>
                    <Col xs={4} sm={5}>
                        <Form.Text>
                            Last Seated
                        </Form.Text>
                    </Col>
                    <Col xs={8} sm={7}>
                        <Form.Text className={"text-white"}>
                            {convertCommaValueString(artist?.seatedDays)}
                        </Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col xs={4} sm={5}>
                        <Form.Text>
                            Days Seated
                        </Form.Text>
                    </Col>
                    <Col xs={8} sm={7}>
                        <Form.Text className={"text-white"}>
                            {convertCommaValueString(artist?.seatedDays)}
                        </Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col xs={4} sm={5}>
                        <Form.Text>
                            Days on Standby
                        </Form.Text>
                    </Col>
                    <Col xs={8} sm={7}>
                        <Form.Text className={"text-white"}>
                            {convertCommaValueString(artist?.standbyDays)}
                        </Form.Text>
                    </Col>
                </Form.Group>
            </Col>
        </>
    ) : (<></>);

    const seatingBlock = artist.id ? (
        <>
            <Col xs={12} sm={3}>
                <Form.Group as={Row} className={"mt-3 mt-sm-0"}>
                    <Col xs={2} sm={4}>
                        <Form.Label>Table</Form.Label>
                    </Col>
                    <Col xs={4} sm={8}>
                        <Form.Control type={"text"}
                                      ref={ref => tableTextBox = ref}
                                      onChange={onControlChange}/>
                    </Col>
                </Form.Group>
            </Col>
            <Col xs={12} sm={3}>
                <Form.Group as={Row} className={"mt-3 mt-sm-0"}>
                    <Col xs={2} sm={4}>
                        <Form.Label>Room</Form.Label>
                    </Col>
                    <Col xs={4} sm={8}>
                        <Form.Control type={"text"}
                                      ref={ref => roomTextBox = ref}
                                      onChange={onControlChange}/>
                    </Col>
                </Form.Group>
            </Col>
        </>
    ) : (<></>);

    return (
        <Form>
            <Row className={"mt-4"}>
                <Col xs={12}>
                    <Form.Group as={Row}>
                        <Col xs={2} sm={2}>
                            <Form.Label>Name</Form.Label>
                        </Col>
                        <Col xs={10} sm={10}>
                            <Form.Control type={"text"}
                                          ref={ref => nameTextBox = ref}
                                          onChange={onControlChange}
                                          autoFocus
                                          placeholder={"(required)"}/>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row className={"mt-3"}>
                <Col xs={12} sm={6}>
                    <Form.Group as={Row}>
                        <Col xs={2} sm={4}>
                            <Form.Label>Badge</Form.Label>
                        </Col>
                        <Col xs={4} sm={8}>
                            <Form.Control type={"text"}
                                          ref={ref => badgeTextBox = ref}
                                          onChange={onControlChange}
                                          placeholder={"(required)"}/>
                        </Col>
                    </Form.Group>
                </Col>
                {seatingBlock}
            </Row>
            <Row className={"mt-3"}>
                <Col xs={12}>
                    <Form.Group as={Row}>
                        <Col xs={2} sm={2}>
                            <Form.Label>Contact</Form.Label>
                        </Col>
                        <Col xs={10} sm={10}>
                            <Form.Control type={"text"}
                                          ref={ref => phoneTextBox = ref}
                                          onChange={onControlChange}/>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row className={"mt-3"}>
                <Col xs={12}>
                    <Form.Group as={Row}>
                        <Col xs={2} sm={2}>
                            <Form.Label>Remarks</Form.Label>
                        </Col>
                        <Col xs={10} sm={10}>
                            <Form.Control as={"textarea"}
                                          ref={ref => remarksTextBox = ref}
                                          onChange={onControlChange}/>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row className={"mt-3"}>
                <Col xs={2} sm={2}>
                    <Form.Label>Info</Form.Label>
                </Col>
                <Col xs={10} sm={4}>
                    <Form.Group as={Row} className={"text-lottery"}>
                        <Form.Check type={"checkbox"}
                                    label={"Lottery Eligible"}
                                    ref={ref => lotteryEligibleCheckBox = ref}
                                    onChange={onControlChange}/>
                    </Form.Group>
                    <Form.Group as={Row} className={"text-lottery"}>
                        <Form.Check type={"checkbox"}
                                    label={"Lottery Guaranteed"}
                                    ref={ref => lotteryGuaranteedCheckBox = ref}
                                    onChange={onControlChange}/>
                    </Form.Group>
                </Col>
                {infoBlock}
            </Row>
            <hr/>
            <Row>
                <Col xs={4}>
                    <BlockButtonGroup>
                        <Button onClick={onDelete} variant={"dark"} disabled={!artist?.id}>
                            <DeleteIcon/>
                            {" Delete"}
                        </Button>
                    </BlockButtonGroup>
                </Col>
                <Col xs={4}>
                    <BlockButtonGroup>
                        <Button onClick={onCancel} variant={"secondary"}>
                            <CancelIcon/>
                            {" Cancel"}
                        </Button>
                    </BlockButtonGroup>
                </Col>
                <Col xs={4}>
                    <BlockButtonGroup>
                        <Button onClick={onSave}>
                            <SaveIcon/>
                            {" Save"}
                        </Button>
                    </BlockButtonGroup>
                </Col>
            </Row>
        </Form>
    );
}
