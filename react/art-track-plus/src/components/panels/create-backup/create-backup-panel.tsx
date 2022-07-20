import React, {memo} from "react";
import {Button, Col, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";
import DatabaseIcon from "../../icons/database-icon";
import TrashIcon from "../../icons/trash-icon";
import RestoreIcon from "../../icons/restore-icon";
import ExportJsonIcon from "../../icons/export-json-icon";
import RawEditIcon from "../../icons/raw-edit-icon";
import ConfirmRevealButton from "../../buttons/confirm-reveal-button";
import names from "../../../names";

function CreateBackupPanel() {
    return (
        <div className={"create-backup-panel my-3"}>
            <h1 className={"text-center"}>
                Database
            </h1>
            <hr/>
            <Row>
                <Col sm={12} md={6} className={"mt-1"}>
                    <h3><ExportJsonIcon/> Create Backup</h3>
                    <p>A backup of all application data can be made in JSON format.</p>
                    <BlockButtonGroup>
                        <Button variant={"secondary"}>Create and Download</Button>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"mt-3 mt-md-1"}>
                    <h3><RestoreIcon/> Restore Backup</h3>
                    <p>A previously downloaded backup in JSON format can be restored.</p>
                    <BlockButtonGroup>
                        <ConfirmRevealButton variant={"warning"} confirmText={"restore"}>Choose a File...</ConfirmRevealButton>
                    </BlockButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} className={"my-3 mt-md-4"}>
                    <h3><TrashIcon/> Clear Database</h3>
                    <p>This will clear the entire database. Ensure you have created backups!</p>
                    <BlockButtonGroup>
                        <ConfirmRevealButton variant={"danger"} confirmText={"clear"}>Wipe Everything</ConfirmRevealButton>
                    </BlockButtonGroup>
                </Col>
            </Row>
            <hr/>
            <h1 className={"text-center"}>Testing &amp; Troubleshooting</h1>
            <hr/>
            <Row>
                <Col sm={12} md={6}>
                    <h3><RawEditIcon/> Raw Data Editor</h3>
                    <p>Modify raw {names.vendor} data for otherwise unsupported on-the-fly situations.</p>
                    <BlockButtonGroup>
                        <Button variant={"warning"}>Open</Button>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"mt-3 mt-md-0"}>
                    <h3><DatabaseIcon/> Generate Test Data</h3>
                    <p>The database will be replaced with randomized test data.</p>
                    <BlockButtonGroup>
                        <ConfirmRevealButton variant={"danger"} confirmText={"generate"}>Generate Test Data</ConfirmRevealButton>
                    </BlockButtonGroup>
                </Col>
            </Row>
        </div>
    );
}

export default memo(CreateBackupPanel);
