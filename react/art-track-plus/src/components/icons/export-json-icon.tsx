import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCode} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ExportJsonIcon() {
    return (
        <FontAwesomeIcon icon={faFileCode}/>
    );
}

export default memo(ExportJsonIcon);