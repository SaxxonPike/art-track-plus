import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function CloseIcon() {
    return (
        <FontAwesomeIcon icon={faClose}/>
    );
}

export default memo(CloseIcon);
