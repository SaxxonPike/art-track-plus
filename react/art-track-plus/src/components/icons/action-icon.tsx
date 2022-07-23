import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBolt} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

function ActionIcon(props) {
    return (
        <FontAwesomeIcon{...props}  icon={faBolt}/>
    );
}

export default memo(ActionIcon);