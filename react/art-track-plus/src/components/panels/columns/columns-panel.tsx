import React, {memo} from "react";
import "./columns-panel.scss";
import {Button} from "react-bootstrap";
import {AppContext} from "../../../app-context";

interface Props {
    appContext: AppContext;
}

function ColumnsPanel({appContext}: Props) {
    const testClick = () => {
        appContext.setState({showAlert: true});
    };

    return (
        <div className={"columns-panel"}>
            <Button type={"button"} variant={"primary"} onClick={testClick}>
                Test Modal
            </Button>
        </div>
    );
}

export default memo(ColumnsPanel);
