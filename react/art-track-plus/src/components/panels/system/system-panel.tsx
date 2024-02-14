import React, {memo} from "react";
import {Button, Col, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";
import SettingsIcon from "../../icons/settings-icon";
import DatabaseIcon from "../../icons/database-icon";
import ExperimentalIcon from "../../icons/experimental-icon";
import ButtonPageLink from "../../buttons/button-page-link";
import paths from "../../../paths";
import GoIcon from "../../icons/go-icon";

function SystemPanel() {
    return (
        <div className={"create-backup-panel my-3"}>
            <h1 className={"text-center"}>
                <SettingsIcon />
                {" System"}
            </h1>
            <hr/>
            <Row>
                <Col sm={12} md={6} className={"mt-1"}>
                    <h3><DatabaseIcon/> Database</h3>
                    <p>Backup, restore or wipe data.</p>
                    <BlockButtonGroup>
                        <ButtonPageLink href={paths.database} variant={"primary"}><GoIcon/> See Database Operations</ButtonPageLink>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"mt-3 mt-md-1"}>
                    <h3><ExperimentalIcon/> Testing &amp; Troubleshooting</h3>
                    <p>Directly manipulate JSON or work with test data.</p>
                    <BlockButtonGroup>
                        <ButtonPageLink href={paths.testing} variant={"primary"}>
                            <GoIcon/> See Testing Operations
                        </ButtonPageLink>
                    </BlockButtonGroup>
                </Col>
            </Row>
        </div>
    );
}

export default memo(SystemPanel);
