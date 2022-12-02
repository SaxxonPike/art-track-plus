import React, {memo} from "react";
import {Button, Col, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";
import names from "../../../names";
import PlusIcon from "../../icons/plus-icon";
import ActionIcon from "../../icons/action-icon";
import LotteryIcon from "../../icons/lottery-icon";
import SignOutIcon from "../../icons/sign-out-icon";
import GoIcon from "../../icons/go-icon";
import ButtonPageLink from "../../buttons/button-page-link";
import paths from "../../../paths";
import ConfirmRevealButton from "../../buttons/confirm-reveal-button";
import {useNavigate} from "react-router-dom";
import {AppActions} from "../../../app-actions";

interface Props {
    actions: AppActions
}

function ActionsPanel({actions}: Props) {
    const navigate = useNavigate();

    function onCloseOutClick() {
        // todo
        navigate(paths.columns);
    }

    function onRapidArtistEntryClick() {
        // todo
        navigate(paths.addArtist);
    }

    return (
        <div className={"actions-panel my-3"}>
            <h1 className={"text-center"}>
                <ActionIcon/>
                {" Tools"}
            </h1>
            <hr/>
            <Row>
                <Col sm={12} md={6} className={"mt-1"}>
                    <h3><LotteryIcon/> Run Lottery</h3>
                    <p>Run the lottery for a number of seats.</p>
                    <BlockButtonGroup>
                        <ButtonPageLink href={paths.lottery} variant={"info"}><GoIcon/> Run Lottery...</ButtonPageLink>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"mt-3 mt-md-1"}>
                    <h3><SignOutIcon/> Close Out</h3>
                    <p>Sign all remaining {names.vendors} out.</p>
                    <BlockButtonGroup>
                        <ConfirmRevealButton variant={"warning"}
                                             confirmText={"close"}
                                             onClick={onCloseOutClick}>
                            <GoIcon/> Close Out
                        </ConfirmRevealButton>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"my-3 mt-md-4"}>
                    <h3><PlusIcon/> Rapid Room Entry</h3>
                    <p>A quick way to assign {names.vendors} to rooms.</p>
                    <BlockButtonGroup>
                        <Button variant={"secondary"}
                                disabled={true}>
                            Not available yet.
                        </Button>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"my-3 mt-md-4"}>
                    <h3><PlusIcon/> Rapid {names.vendorCap} Entry</h3>
                    <p>A quick way to add many new {names.vendors} at once.</p>
                    <BlockButtonGroup>
                        <ButtonPageLink href={paths.artistRapidEntry} variant={"primary"}>
                            <GoIcon/> Begin {names.vendorCap} Entry
                        </ButtonPageLink>
                    </BlockButtonGroup>
                </Col>
            </Row>
        </div>
    );
}

export default memo(ActionsPanel);
