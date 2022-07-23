import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCsv} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ExportCsvIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faFileCsv}/>
    );
}

export default memo(ExportCsvIcon);