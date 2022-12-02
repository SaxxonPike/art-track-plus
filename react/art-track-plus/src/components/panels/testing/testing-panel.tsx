import React, {memo} from "react";
import {Button, Col, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";
import SettingsIcon from "../../icons/settings-icon";
import DatabaseIcon from "../../icons/database-icon";
import ExperimentalIcon from "../../icons/experimental-icon";
import GoIcon from "../../icons/go-icon";
import CrumbIcon from "../../icons/crumb-icon";
import RawEditIcon from "../../icons/raw-edit-icon";
import names from "../../../names";
import ConfirmRevealButton from "../../buttons/confirm-reveal-button";

function TestingPanel() {
    return (
        <div className={"testing-panel my-3"}>
            <h1 className={"text-center"}>
                <SettingsIcon/>
                {" "}
                <CrumbIcon/>
                {" "}
                <ExperimentalIcon/>
                {" Testing & Troubleshooting"}
            </h1>
            <hr/>
            <Row>
                <Col sm={12} md={6}>
                    <h3><RawEditIcon/> Raw Data Editor</h3>
                    <p>Modify raw {names.vendor} data for otherwise unsupported on-the-fly situations.</p>
                    <BlockButtonGroup>
                        <Button variant={"warning"}><GoIcon/> Open</Button>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"mt-3 mt-md-0"}>
                    <h3><DatabaseIcon/> Generate Test Data</h3>
                    <p>The database will be replaced with randomized test data.</p>
                    <BlockButtonGroup>
                        <ConfirmRevealButton variant={"danger"}
                                             confirmText={"generate"}>
                            <GoIcon/> Generate Test Data
                        </ConfirmRevealButton>
                    </BlockButtonGroup>
                </Col>
            </Row>
        </div>
    );
}

export default memo(TestingPanel);
