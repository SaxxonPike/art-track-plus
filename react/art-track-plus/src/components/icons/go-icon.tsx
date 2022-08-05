import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function GoIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faPlay}/>
    );
}

export default memo(GoIcon);