import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRotateLeft} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function RestoreIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faArrowRotateLeft}/>
    );
}

export default memo(RestoreIcon);