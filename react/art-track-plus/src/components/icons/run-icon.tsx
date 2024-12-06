import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlay} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function RunIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faCirclePlay}/>
    );
}

export default memo(RunIcon);