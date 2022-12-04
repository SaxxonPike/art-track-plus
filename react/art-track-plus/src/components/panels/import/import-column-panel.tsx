import React from "react";
import {memo} from "react";
import CsvParser from "../../../features/tools/csv-parser";
import {Button, Col, Form, Row} from "react-bootstrap";
import BlockButtonGroup from "../../buttons/block-button-group";
import GoIcon from "../../icons/go-icon";
import names from "../../../names";
import FileTools from "../../../features/tools/file-tools";

export interface Props {
    onSetRecords: (string) => void
}

function ImportColumnPanel({onSetRecords, ...props}: Props) {
    let csvFileRef;

    function doImport() {
        const buffer = FileTools.upload(csvFileRef.files[0]).then(csv => {
            const parsed = CsvParser.parse(csv);
            if (onSetRecords) {
                onSetRecords(parsed);
            }
        });
    }

    return <div>
        <Row>
            <Col xs={12}>
                <div className={"text-center"}>
                    {"This tool allows importing artists via a CSV file. "}
                    {"Once the file is selected, input columns can be mapped to "}
                    {names.vendor}
                    {" fields."}
                </div>
            </Col>
        </Row>
        <hr/>
        <Row>
            <Col xs={0} lg={3}/>
            <Col xs={12} lg={6}>
                <div className="mb-3">
                    <Form.Group>
                        <input className="form-control"
                               type="file"
                               id="restoreFile"
                               ref={r => csvFileRef = r}/>
                    </Form.Group>
                </div>
                <BlockButtonGroup>
                    <Button variant={"primary"}
                            onClick={doImport}>
                        <GoIcon/> Use File
                    </Button>
                </BlockButtonGroup>
            </Col>
            <Col sm={0} lg={3}/>
        </Row>
    </div>;
}

export default memo(ImportColumnPanel);
