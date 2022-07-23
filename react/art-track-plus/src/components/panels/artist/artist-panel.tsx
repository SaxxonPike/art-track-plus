import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import paths from "../../../paths";
import names from "../../../names";
import {AppActions} from "../../../app-actions";
import Artist from "../../../models/artist";
import {Button, Col, Form, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";
import SignOutIcon from "../../icons/sign-out-icon";
import SignInIcon from "../../icons/sign-in-icon";
import StandbyIcon from "../../icons/standby-icon";
import SaveIcon from "../../icons/save-icon";
import "./artist-panel.scss";
import CancelIcon from "../../icons/cancel-icon";
import DeleteIcon from "../../icons/delete-icon";
import UserIcon from "../../icons/user-icon";
import UserAddIcon from "../../icons/user-add-icon";

export interface Props {
    actions: AppActions
    artistId: number | null
    rapidEntry: boolean
}

interface State {
    artist: Artist
    artistId: number
}

export default function ArtistPanel({actions, artistId, rapidEntry}: Props) {
    const [state, setState] = useState<State>({
        // This gnarly bit of logic:
        // - sets a copy of the artist if the record was found
        // - sets new object if artist ID is absent or artist is not found
        artist: {...((artistId && rapidEntry) ? actions.getArtist(artistId) ?? getDefaultArtist() : getDefaultArtist())},
        artistId: rapidEntry ? null : artistId
    });

    const navigate = useNavigate();

    let nameTextBox;
    let badgeTextBox;
    let tableTextBox;
    let roomTextBox;
    let phoneTextBox;
    let remarksTextBox;
    let lotteryEligibleCheckBox;
    let lotteryGuaranteedCheckBox;

    function getDefaultArtist(): Artist {
        return {
            lotteryEligible: true
        };
    }

    function onCancel() {
        navigate(paths.columns);
    }

    function onSave() {
        // do save
        if (rapidEntry) {
            onRapidReset();
            nameTextBox.focus();
        } else {
            navigate(paths.columns);
        }
    }

    function onDelete() {
        // do nothing
    }

    function onChange() {
        setState({
            ...state,
            artist: {
                ...state.artist,
                name: nameTextBox.value,
                badgeNumber: badgeTextBox.value,
                tableNumber: tableTextBox.value,
                roomNumber: roomTextBox.value,
                phone: phoneTextBox.value,
                remarks: remarksTextBox.value,
                lotteryEligible: lotteryEligibleCheckBox.checked,
                lotteryGuaranteed: lotteryGuaranteedCheckBox.checked
            }
        });
        console.log("state", state);
    }

    function onRapidReset() {
        setState({
            ...state,
            artist: {},
            artistId: 0
        });
    }

    useEffect(() => {
        if (!artistId) {
            nameTextBox.focus();
        } else {
            tableTextBox.value = state.artist.tableNumber ?? "";
            roomTextBox.value = state.artist.roomNumber ?? "";
        }

        nameTextBox.value = state.artist.name ?? "";
        badgeTextBox.value = state.artist.badgeNumber ?? "";
        phoneTextBox.value = state.artist.phone ?? "";
        remarksTextBox.value = state.artist.remarks ?? "";
        lotteryEligibleCheckBox.checked = state.artist.lotteryEligible ?? false;
        lotteryGuaranteedCheckBox.checked = state.artist.lotteryGuaranteed ?? false;
    }, [
        artistId, nameTextBox, badgeTextBox, phoneTextBox,
        remarksTextBox, tableTextBox, roomTextBox, state.artist.name,
        state.artist.badgeNumber, state.artist.phone, state.artist.remarks,
        state.artist.lotteryEligible, state.artist.lotteryGuaranteed,
        state.artist.tableNumber, state.artist.roomNumber, lotteryEligibleCheckBox,
        lotteryGuaranteedCheckBox
    ]);

    const title = (state.artistId ? " Edit " : " Add ") + names.vendorCap;
    const titleIcon = (state.artistId ? <UserIcon/> : <UserAddIcon/>);

    // Artist actions available only for existing records.
    const artistActions = state.artistId ? (
        <Row>
            <Col xs={12} sm={4}>
                <BlockButtonGroup>
                    <Button variant={"sign-out"}>
                        <SignOutIcon/>
                        {" Sign Out"}
                    </Button>
                </BlockButtonGroup>
            </Col>
            <Col xs={12} sm={4}>
                <BlockButtonGroup>
                    <Button variant={"standby"}>
                        <StandbyIcon/>
                        {" Standby"}
                    </Button>
                </BlockButtonGroup>
            </Col>
            <Col xs={12} sm={4}>
                <BlockButtonGroup>
                    <Button variant={"sign-in"}>
                        <SignInIcon/>
                        {" Sign In"}
                    </Button>
                </BlockButtonGroup>
            </Col>
        </Row>
    ) : (<></>);

    // Full info available only for existing records.
    const infoBlock = state.artistId ? (
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
                            12345
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
                            12345
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
                            12345
                        </Form.Text>
                    </Col>
                </Form.Group>
            </Col>
        </>
    ) : (<></>);

    const seatingBlock = state.artistId ? (
        <>
            <Col xs={12} sm={3}>
                <Form.Group as={Row} className={"mt-3 mt-sm-0"}>
                    <Col xs={2} sm={4}>
                        <Form.Label>Table</Form.Label>
                    </Col>
                    <Col xs={4} sm={8}>
                        <Form.Control type={"text"}
                                      ref={ref => tableTextBox = ref}
                                      onChange={onChange}/>
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
                                      onChange={onChange}/>
                    </Col>
                </Form.Group>
            </Col>
        </>
    ) : (<></>);

    return (
        <div className={"artist-panel my-3"}>
            <h1 className={"text-center"}>{titleIcon}{title}</h1>
            <hr/>
            {artistActions}
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
                                              onChange={onChange}
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
                                              onChange={onChange}
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
                                              onChange={onChange}/>
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
                                              onChange={onChange}/>
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
                                        onChange={onChange}/>
                        </Form.Group>
                        <Form.Group as={Row} className={"text-lottery"}>
                            <Form.Check type={"checkbox"}
                                        label={"Lottery Guaranteed"}
                                        ref={ref => lotteryGuaranteedCheckBox = ref}
                                        onChange={onChange}/>
                        </Form.Group>
                    </Col>
                    {infoBlock}
                </Row>
                <hr/>
                <Row>
                    <Col xs={4}>
                        <BlockButtonGroup>
                            <Button onClick={onDelete} variant={"warning"} disabled={!state.artistId}>
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
        </div>
    )
}