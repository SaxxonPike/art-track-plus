import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ReportIcon() {
    return (
        <FontAwesomeIcon icon={faFile}/>
    );
}

export default memo(ReportIcon);