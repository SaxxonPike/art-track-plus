import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCsv} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ExportCsvIcon() {
    return (
        <FontAwesomeIcon icon={faFileCsv}/>
    );
}

export default memo(ExportCsvIcon);