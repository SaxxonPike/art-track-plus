import React, {memo} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";
import DatabaseIcon from "../../icons/database-icon";
import TrashIcon from "../../icons/trash-icon";
import RestoreIcon from "../../icons/restore-icon";
import ExportJsonIcon from "../../icons/export-json-icon";
import ConfirmRevealButton from "../../buttons/confirm-reveal-button";
import SettingsIcon from "../../icons/settings-icon";
import CrumbIcon from "../../icons/crumb-icon";
import GoIcon from "../../icons/go-icon";
import {AppActions} from "../../../app-actions";

interface Props {
    actions: AppActions
}

function DatabasePanel({actions}: Props) {
    let restoreFileRef;

    function onBackupClick() {
        actions.backupToDownload();
    }

    function onRestoreClick() {
        const file = restoreFileRef.files[0];
        if (!file) {
            console.log("No file to restore.");
            return;
        }

        actions.restoreFromUpload(file);
    }

    function onWipeEverything() {
        actions.eraseAllArtists()
            .then(() => actions.openToast({
                header: "Wipe Everything",
                body: "Wipe was successful."
            }));
    }

    return (
        <Col className={"create-backup-panel my-3"}>
            <h1 className={"text-center"}>
                <SettingsIcon/>
                {" "}
                <CrumbIcon/>
                {" "}
                <DatabaseIcon/>
                {" Database"}
            </h1>
            <hr/>
            <Row>
                <Col sm={12} md={6} className={"mt-1"}>
                    <h3><ExportJsonIcon/> Create Backup</h3>
                    <p>A backup of all application data can be made in JSON format.</p>
                    <BlockButtonGroup>
                        <Button variant={"secondary"}
                                onClick={onBackupClick}>
                            <GoIcon/> Create and Download
                        </Button>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"mt-3 mt-md-1"}>
                    <h3><RestoreIcon/> Restore Backup</h3>
                    <p>A previously downloaded backup in JSON format can be restored.</p>
                    <Col sm={12}>
                        <div className="mb-3">
                            <Form.Group>
                                <input className="form-control"
                                       type="file"
                                       id="restoreFile"
                                       ref={r => restoreFileRef = r}/>
                            </Form.Group>
                        </div>
                    </Col>
                    <BlockButtonGroup>
                        <ConfirmRevealButton variant={"warning"}
                                             confirmText={"restore"}
                                             onClick={onRestoreClick}>
                            <GoIcon/> Restore this File...
                        </ConfirmRevealButton>
                    </BlockButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} className={"my-3 mt-md-4"}>
                    <h3><TrashIcon/> Clear Database</h3>
                    <p>This will clear the entire database. Ensure you have created backups!</p>
                    <BlockButtonGroup>
                        <ConfirmRevealButton variant={"danger"}
                                             confirmText={"clear"}
                                             onClick={onWipeEverything}>
                            <GoIcon/> Wipe Everything
                        </ConfirmRevealButton>
                    </BlockButtonGroup>
                </Col>
            </Row>
        </Col>
    );
}

export default memo(DatabasePanel);
