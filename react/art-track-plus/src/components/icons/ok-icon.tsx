import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {memo} from "react";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

function OkIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faCheck}/>
    );
}

export default memo(OkIcon);