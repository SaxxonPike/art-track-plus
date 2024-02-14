import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ReportIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faFile}/>
    );
}

export default memo(ReportIcon);