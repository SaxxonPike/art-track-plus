import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilePen} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function RawEditIcon() {
    return (
        <FontAwesomeIcon icon={faFilePen}/>
    );
}

export default memo(RawEditIcon);