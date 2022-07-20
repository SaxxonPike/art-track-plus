import React, {memo} from "react";
import {Button, Col, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";

function CreateBackupPanel() {
    return (
        <div className={"create-backup-panel my-3"}>
            <Row>
                <Col sm={12} md={6}>
                    <h3>Create Backup</h3>
                    <p>A backup of all application data can be made in JSON format.</p>
                    <BlockButtonGroup>
                        <Button variant={"secondary"}>Create and Download</Button>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"mt-3 mt-md-0"}>
                    <h3>Restore Backup</h3>
                    <p>A previously downloaded backup in JSON format can be restored.</p>
                    <BlockButtonGroup>
                        <Button variant={"warning"}>Choose a File...</Button>
                    </BlockButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} className={"mt-3 mt-md-4"}>
                    <h3>Clear Database</h3>
                    <p>This will clear the entire database. Ensure you have created backups!</p>
                    <BlockButtonGroup>
                        <Button variant={"danger"}>Wipe Everything</Button>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"mt-3 mt-md-4"}>
                    <h3>Generate Test Data</h3>
                    <p>The database will be replaced with randomized test data.</p>
                    <BlockButtonGroup>
                        <Button variant={"danger"}>Generate Test Data</Button>
                    </BlockButtonGroup>
                </Col>
            </Row>
        </div>
    );
}

export default memo(CreateBackupPanel);
