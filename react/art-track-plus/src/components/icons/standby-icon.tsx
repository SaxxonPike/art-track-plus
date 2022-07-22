import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function StandbyIcon() {
    return (
        <FontAwesomeIcon icon={faClock}/>
    );
}

export default memo(StandbyIcon);