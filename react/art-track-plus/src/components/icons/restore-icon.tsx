import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRotateLeft} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function RestoreIcon() {
    return (
        <FontAwesomeIcon icon={faArrowRotateLeft}/>
    );
}

export default memo(RestoreIcon);