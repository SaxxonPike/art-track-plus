import React, {memo} from "react";
import {Button, Col, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";
import DatabaseIcon from "../../icons/database-icon";
import TrashIcon from "../../icons/trash-icon";
import RestoreIcon from "../../icons/restore-icon";
import ExportJsonIcon from "../../icons/export-json-icon";
import RawEditIcon from "../../icons/raw-edit-icon";
import ConfirmRevealButton from "../../buttons/confirm-reveal-button";
import ExportCsvIcon from "../../icons/export-csv-icon";

function ReportsPanel() {
    return (
        <div className={"create-backup-panel my-3"}>
            <h1 className={"text-center"}>
                Reports
            </h1>
            <hr/>
            <Row>
                <Col sm={12} md={6} className={"mt-1"}>
                    <h3><ExportCsvIcon/> Export Standard CSV</h3>
                    <p>Exports a standard format CSV.</p>
                    <BlockButtonGroup>
                        <Button variant={"primary"}>Export CSV</Button>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"mt-3 mt-md-1"}>
                    <h3><ExportCsvIcon/> Export Excel CSV</h3>
                    <p>Exports a CSV for use with Microsoft Excel.</p>
                    <BlockButtonGroup>
                        <Button variant={"primary"}>Export Excel CSV</Button>
                    </BlockButtonGroup>
                </Col>
            </Row>
        </div>
    );
}

export default memo(ReportsPanel);
