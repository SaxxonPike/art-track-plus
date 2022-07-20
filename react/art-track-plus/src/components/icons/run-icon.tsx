import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlay} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function RunIcon() {
    return (
        <FontAwesomeIcon icon={faCirclePlay}/>
    );
}

export default memo(RunIcon);