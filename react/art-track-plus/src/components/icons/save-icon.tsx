import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function SaveIcon() {
    return (
        <FontAwesomeIcon icon={faFloppyDisk}/>
    );
}

export default memo(SaveIcon);