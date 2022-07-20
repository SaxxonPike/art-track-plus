import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBolt} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ActionIcon() {
    return (
        <FontAwesomeIcon icon={faBolt}/>
    );
}

export default memo(ActionIcon);