import React, {memo} from "react";
import {Button, Col, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";
import names from "../../../names";
import PlusIcon from "../../icons/plus-icon";
import ActionIcon from "../../icons/action-icon";

function ActionsPanel() {
    return (
        <div className={"actions-panel my-3"}>
            <h1 className={"text-center"}>
                <ActionIcon/>
                {" Tools"}
            </h1>
            <hr/>
            <Row>
                <Col sm={12} md={6} className={"mt-1"}>
                    <h3><PlusIcon/> Rapid {names.vendorCap} Entry</h3>
                    <p>A quick way to add lots of {names.vendors}.</p>
                    <BlockButtonGroup>
                        <Button variant={"primary"}>Go</Button>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"mt-3 mt-md-1"}>
                    <h3><PlusIcon/> Rapid Room Entry</h3>
                    <p>A quick way to assign {names.vendors} to rooms.</p>
                    <BlockButtonGroup>
                        <Button variant={"primary"}>Go</Button>
                    </BlockButtonGroup>
                </Col>
            </Row>
        </div>
    );
}

export default memo(ActionsPanel);
