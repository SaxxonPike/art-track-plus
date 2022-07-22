import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function CancelIcon() {
    return (
        <FontAwesomeIcon icon={faAngleLeft}/>
    );
}

export default memo(CancelIcon);
