import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function StandbyIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={faClock}/>
    );
}

export default memo(StandbyIcon);