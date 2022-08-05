import React, {memo} from "react";
import {Button, Col, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";
import ExportCsvIcon from "../../icons/export-csv-icon";
import ReportIcon from "../../icons/report-icon";
import GoIcon from "../../icons/go-icon";

function ReportsPanel() {
    return (
        <div className={"create-backup-panel my-3"}>
            <h1 className={"text-center"}>
                <ReportIcon/>
                {" Reports"}
            </h1>
            <hr/>
            <Row>
                <Col sm={12} md={6} className={"mt-1"}>
                    <h3><ExportCsvIcon/> Export Standard CSV</h3>
                    <p>Exports a standard format CSV.</p>
                    <BlockButtonGroup>
                        <Button variant={"primary"}><GoIcon/> Export and Download</Button>
                    </BlockButtonGroup>
                </Col>
                <Col sm={12} md={6} className={"mt-3 mt-md-1"}>
                    <h3><ExportCsvIcon/> Export Excel CSV</h3>
                    <p>Exports a CSV for use with Microsoft Excel.</p>
                    <BlockButtonGroup>
                        <Button variant={"primary"}><GoIcon/> Export and Download</Button>
                    </BlockButtonGroup>
                </Col>
            </Row>
        </div>
    );
}

export default memo(ReportsPanel);
